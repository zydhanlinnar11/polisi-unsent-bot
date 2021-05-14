const ajax = new XMLHttpRequest()

const sendButton = document.getElementById('send-message-button')

function getChannelID() {
  const firstQuery = window.location.search.substr(1)
  return firstQuery.split('=')[1]
}

function closeAlert() {
  const alert = document.getElementById('alert')

  alert.style.position = 'fixed'
  alert.style.visibility = 'hidden'
  alert.classList.remove(`alert-success`)
  alert.classList.remove(`alert-danger`)
}

function showAlert(type = new String(), message = new String()) {
  const alert = document.getElementById(`alert`)
  const alertMessage = document.getElementById(`alert-message`)
  const alertCloseBtn = document.getElementById(`alert-close-btn`)

  alert.classList.add(`alert-${type}`)
  alert.style.visibility = 'visible'
  alert.style.position = 'relative'
  alertMessage.innerText = message
  alertCloseBtn.onclick = closeAlert
}

ajax.onreadystatechange = () => {
  if (ajax.readyState == ajax.DONE) {
    showAlert(ajax.status == 200 ? 'success' : 'danger', ajax.responseText)
  }
}

function sendMessage() {
  channelID = getChannelID()
  const message = document.getElementById('msg').value
  ajax.open('POST', `/channel/${channelID}/send-message`, true)

  //Send the proper header information along with the request
  closeAlert()
  ajax.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
  ajax.send(`msg=${message}&channel_id=${channelID}`)
}

function tagButtonInit() {
  const buttons = document.getElementsByClassName('list-group-item')

  for (let i = 0; i < buttons.length; i++) {
    buttons[i].onclick = () => {
      if (
        document.getElementById('msg').value[
          document.getElementById('msg').value.length - 1
        ] != ' ' &&
        document.getElementById('msg').value.length != 0
      )
        document.getElementById('msg').value =
          document.getElementById('msg').value + ' '
      document.getElementById('msg').value =
        document.getElementById('msg').value + `<@!${buttons[i].id}>`
    }
  }
}

tagButtonInit()
