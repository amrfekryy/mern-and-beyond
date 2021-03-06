import Gun from 'gun/gun'
import { uuidv4 } from './helpers'
import { map } from 'lodash'
// require('gun/lib/open.js')

// initialize Gun
export const gun = Gun()

export const syncFromGunToRedux = (app, actionDispatcher) => {
  /* triggers an action dispatcher (i.e. setData) upon adding/updating data */

  gun.get(app).map().on(data => {
    delete data._ // delete extra data from gun
    actionDispatcher(app, data)
  })
}

export const addToGun = (app, formData) => {
  /* adds form data + a uuid to gun as app element */

  // set counter for each app to name app elements
  gun.get('counters').get(`${app}Count`).once(countInGUN => {
    // calculate count of this app element based on gun
    const currentCount = countInGUN ? countInGUN += 1 : 1
    // initialize/update count in gun
    gun.get('counters').get(`${app}Count`).put(currentCount)
    // create node for the app element and connect it to app
    const appElement = gun.get(`${app.slice(0, -1) + currentCount}`).put({ ...formData, id: uuidv4() })
    gun.get(app).set(appElement)
  })

  // gun.get(app).set({ ...formData, id: uuidv4() })
}

export const gunExample = () => {

  // // create root and users nodes
  // const root = gun.get('root')
  // const users = root.get('users')
  // // console.log('Users Exist?  ', gun.get('users').once())

  // empty users node if exists
  // if (gun.get('users').once()) {
  //   gun.get('users').put(null)
  // }

  console.log('xxxxxxxxxxxxxxxx', gun.get('users').once())

  // gun.get('users').once(d => {
  //   console.log('ddddddddddd', d)
  //   if (d) {
  //     gun.get('users').put(null)
  //   }
  // })

  // // hard coded list of names
  // const usersNames = ['Amr', 'Fekry', 'Ali']
  // // iterate over list of names
  // map(usersNames, (title) => {
  //   // get a uuid
  //   const uuid = uuidv4()
  //   // craete user node
  //   gun.get('users').get(uuid).put({ title: title, id: uuid })
  // })

  const one = gun.get('1').put({ name: 'Amr', id: '1' })
  const two = gun.get('2').put({ name: 'Wafaa', id: '2' })
  const three = gun.get('3').put({ name: 'Esraa', id: '3' })

  gun.get('users').set(one)
  gun.get('users').set(two)
  gun.get('users').set(three)

  // gun.get('users').get('1').put({ name: 'Amr', id: '1' })
  // gun.get('users').get('2').put({ name: 'Wafaa', id: '2' })
  // gun.get('users').get('3').put({ name: 'Esraa', id: '3' })

  // gun.get('users').once(d => console.log(d))

  // gun.get('users').map().once(function (value, key) {
  //   console.log(`key: ${key}, value: ${value}`)
  // })

  // gun.get('person').put({ name: 'Amr' }).once((value, key) => {
  //   console.log(`Key1: ${key}`, `Value1: ${value}`)
  // })
  // gun.get('person').get('name').put('Amr').once((value, key) => {
  //   console.log(`Key2: ${key}`, `Value2: ${value}`)
  // })

  // var form = document.querySelector('#Gform')
  // var input = document.querySelector('#Ginput')
  // var header = document.querySelector('#Gheader')

  // form.onsubmit = (event) => {
  //   event.preventDefault()
  //   gun.get('hello').put({ name: input.value });
  //   input.value = ''
  // }

  // gun.get('hello').on(function (data, key) {
  //   header.innerHTML = 'Hello ' + data.name
  // })

  // gun.get('root').put(null)

}
