const fileForm = document.querySelector("#fileForm")
const fileUpload = document.querySelector("#fileUpload")

fileForm.addEventListener("submit", async event => {
  event.preventDefault()

  const url = "http://localhost:5000/upload"

  console.log(fileUpload.files[0])
  const formData = new FormData()
  formData.append('myFile', fileUpload.files[0])

  fetch(url, {
    method: 'POST',
    body: formData
  })
  .then(response => response.json())
  .then(data => {
    console.log(data)
  })
  .catch(error => {
    console.error(error)
  })
  
})

const start =  async () => {
  const web3 = await getWeb3();
  const accounts = await web3.eth.getAccounts();
  console.log({accounts})
  const contract = await getContract(web3);
}
// start()