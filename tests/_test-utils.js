'use strict'

process.env.TEST  = true

const { inspect }   = require( 'util' )
const Nightmare     = require( 'nightmare' )
const realMouse     = require( 'nightmare-real-mouse' )
const child_process = require( 'child_process' )
const { exec }      = child_process
const path          = require( 'path' )
const c             = require( 'chalk' )

const { defer }     = require( '../server/helpers' )
const config        = require( '../server/config')
const testDatas     = path.join( __dirname, './sql-test.sqlc' )

const dbTest        = `postgres://localhost:5432/mosaico-backend-test`

// found that it is less prone to errors
realMouse( Nightmare )

////////
// SHARED FUNCTIONNAL THINGS
////////

const resetDB = async _ => {
  const dfd = defer()
  const command = `pg_restore --clean --dbname=${dbTest} ${testDatas}`
  const result  = exec( command, (err, stdout, stderr) => {
    if ( err ) {
      console.error(`exec error: ${err}`)
      return dfd.reject()
    }
    if ( stderr ) {
      console.error(`stderr error`)
      console.log(stderr)
      return dfd.reject()
    }
    console.log( c.blue('[TEST]'), `DB setup has been done` )
    dfd.resolve()
  })
  return dfd
}


const setupServer = _ => {
  const server      = require( '../server')()
  // this is needed for end all the processes generated by the server
  // in order for the tape cli to launch the next test if needed
  const stopServer  = async _ => {
    const dfd = defer()
    const app = await server
    app.shutdown()
    app.on( 'shutdown', dfd.resolve )
    return dfd
  }

  return {
    serverReady: server,
    stopServer,
  }
}

function setupNightmare(show = false)  {

  const nightmare = Nightmare({
    show,
    waitTimeout: 10000,
  }).viewport(1280, 780)

  const closeNightmare = () => nightmare.halt()

  return { nightmare, closeNightmare }

}

const createTest = (plan, showNightmare = false, cb) => async t => {
  // add one more test for waiting nightmare to close…
  // …before getting to the next test
  t.plan( plan + 1 )
  const { nightmare, closeNightmare } = setupNightmare( showNightmare )
  try {
    await cb(t, nightmare)
    await closeNightmare()
    // TODO should finish manually here
    // t.end()
    t.pass( 'end' )
  } catch(err) {
    await closeNightmare()
    t.end(err)
  }
}

////////
// NIGHTMARE COMMON ROUTINES & DATAS
////////

const data = {
  ACTIVE_USER_NAME:   'paul – active user',
  ACTIVE_USER_EMAIL:  'p@p.com',
  ACTIVE_USER_PASS:   'p',
  ACTIVE_USER_ID:     'f30e44d8-7a54-41c9-8814-113a90e02f6e',
  UNACTIVE_USER_ID:   '98540149-8bac-4576-b03c-a06e66196b02',
  NEW_USER_ID:        'e1d8af49-63c2-4638-a288-7e9461b516da',
  TEMPLATE_ID:        'b109c93c-679e-4a7c-8f84-9de3a13c1b38',
  VERSAFIX_ID:        '7131811e-4a5b-4f5b-abd4-eef319b920b1',
  VERSAFIX_NAME:      'versafix',
  GROUP_ID:           'c40dce03-7549-49f3-968a-8c77a7177425',
  ADMIN_MAILING_ID:   '4fe4a47a-2d78-4561-8912-3832f41de389',
}

const connectUser = (email = data.ACTIVE_USER_EMAIL, password = data.ACTIVE_USER_PASS ) => {
  return nightmare => {
    return nightmare
    .goto( `http://${ config.host }?lang=en` )
    .insert( '#email-field', email )
    .insert( '#password-field', password )
    .realClick( 'form[action*="/login"] [type=submit]' )
    .wait( '.js-filter' )
  }
}

const connectAdmin = _ => nightmare => {
  return nightmare
  .goto( `http://${ config.host }/admin?lang=en` )
  .insert('#password-field', 'admin')
  .realClick('form[action*="/login"] [type=submit]')
  .wait('.js-admin-home')
}



////////
// EXPORTS
////////

module.exports = {
  setupServer,
  resetDB,
  createTest,
  // nightmare common routines & datas
  data,
  connectUser,
  connectAdmin,
}
