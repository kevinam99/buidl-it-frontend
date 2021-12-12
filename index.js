const fileForm = document.querySelector("#fileForm")
const fileUpload = document.querySelector("#fileUpload")

fileForm.addEventListener("submit", async event => {
  event.preventDefault()
  const node = await Ipfs.create()
  const results = await node.add(fileUpload.files[0])
  console.log(results.path)


  // const url = "http://localhost:5000/upload"

  // const formData = new FormData()
  // formData.append('myFile', fileUpload.files[0])
  // formData.append('accountAddress', "huihb")

  // fetch(url, {
  //   method: 'POST',
  //   body: formData
  // })
  // .then(response => response.json())
  // .then(data => {
  //   console.log(data)
  // })
  // .catch(error => {
  //   console.error(error)
  // })
  
})

window.addEventListener("load", async () => {
  const web3 = await start()
  const accounts = await web3.eth.getAccounts();
  console.log({accounts})
  const contract = await getContract(web3)
  console.log({contract})

})

const start =  async () => {
  if ((typeof window.ethereum !== 'undefined')
    || (typeof window.web3 !== 'undefined')) {
        return await new Web3(window['ethereum'] || window.web3.currentProvider)
    } else {
        // here you could use a different provider, maybe use an infura account, or maybe let the user know that they need to install metamask in order to continue
        return await new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/90d0874863424b6591c42319fe0bf50f"))
  }
}
