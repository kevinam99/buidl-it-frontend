const imageForm = document.querySelector("#fileForm")
const fileInput = document.querySelector(" fileInput")

fileForm.addEventListener("submit", async event => {
  event.preventDefault()
  const file = fileInput.files[0]

  const { url } = await fetch("/api/s3_url").then(res => res.json())
  console.log(url)

  // post the image direclty to the s3 bucket
  await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "multipart/form-data"
    },
    body: file
  })

  const imageUrl = url.split('?')[0]
  console.log(imageUrl)

  // post requst to my server to store any extra data
  
  
  const img = document.createElement("img")
  img.src = imageUrl
  document.body.appendChild(img)
})