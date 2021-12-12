const fileForm = document.querySelector("#fileForm")
const fileUpload = document.querySelector("#fileUpload")

let web3, contract, account;
fileForm.addEventListener("submit", async event => {
  event.preventDefault()
  const node = await Ipfs.create({repo: 'ok' + Math.random()})
  const results = await node.add(fileUpload.files[0])
  // console.log(results.path)
 const newFile = await contract.methods.addFile(results.path).call()
//  const files = await contract.methods.getFiles().call({from: account})
  // console.log(files)
  let a = document.createElement("a")
    a.href = `https://ipfs.io/ipfs/${newFile}`
    a.innerHTML = newFile
    document.body.appendChild(a)
    let br = document.createElement("br")
    document.body.appendChild(br)
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
  web3 = await start()
  // await window.ethereum.enable();
  await window.ethereum.request({ method: "eth_requestAccounts" });
  account = await web3.currentProvider.selectedAddress
  // console.log({account})
  // const accounts = await web3.eth.getAccounts();
  // console.log(accounts[0])
  contract = await getContract(web3)
  const files = await contract.methods.getFiles().call({from: account})

  for(let i = 0; i < files.length; i++) {
    console.log(files[i])

    let a = document.createElement("a")
    a.href = `https://ipfs.io/ipfs/${files[i]}`
    a.innerHTML = files[i]
    document.body.appendChild(a)
    let br = document.createElement("br")
    document.body.appendChild(br)
  }

})

const start =  async () => {
  if ((typeof window.ethereum !== 'undefined')
    || (typeof window.web3 !== 'undefined')) {
        return await new Web3(window.ethereum)
    } else {
        // here you could use a different provider, maybe use an infura account, or maybe let the user know that they need to install metamask in order to continue
        // return await new Web3(new Web3.providers.HttpProvider("http://ropsten.infura.io/v3/90d0874863424b6591c42319fe0bf50f"))
  }
}
