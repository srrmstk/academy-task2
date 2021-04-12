let getFile = () => {
    const file = document.getElementById("inputGroupFile")
    const reader = new FileReader()
    let result
    reader.onload = () => {
        reader.result
    }
    try {
        reader.readAsText(file.files[0])
    } catch (ex) {
        console.log(ex)
    }
}

let buildForm = () => {
    let data = getFile()
    console.log(data)
    data = JSON.parse(data)
    console.log(data)

}
