const getFile = () => {
    const file = document.getElementById('inputGroupFile')
    const reader = new FileReader()
    reader.onloadend = (e) => {
        const fr = e.target
        buildForm(fr.result)
    }
    try {
        reader.readAsText(file.files[0])
    } catch (ex) {
        console.log(ex)
    }
}

let wrapper = $('#formWrapper')


const renderButtons = (buttons) => {
    wrapper.append($(`<div></div>`).addClass('form-buttons-wrapper'))
    let buttonsWrapper = $('.form-buttons-wrapper')
    buttons.forEach(button => {
        buttonsWrapper.append($(`<button>${button.text}</button>`).addClass('form-button btn btn-outline-secondary'))
    })
}

const renderFields = (fields) => {
    wrapper.append($(`<div></div>`).addClass('form-fields-wrapper'))
    const fieldsWrapper = $('.form-fields-wrapper')
    fields.forEach((field, index) => {
        switch (field.input.type) {
            case ('text'):
            case ('password'): {
                fieldsWrapper.append($('<div></div>').addClass('form-floating').attr('id', index))
                const inputWrapper = $(`#${index}.form-floating`)

                //check if label property exists. If not - just add an input form
                if (field.hasOwnProperty('label')) {
                    inputWrapper.append($(`<label>${field.label}</label>`).attr('for', `input${index}`))
                }

                //make an input form w/ all of its attributes
                const formInput = ($(`<input/>`).addClass('form-control')).attr('id', `input${index}`)

                inputWrapper.prepend(formInput)
                Object.keys(field.input).forEach(key => {
                    if (key === 'required'){
                        formInput.prop(key, field.input[key])
                    } else {
                        formInput.attr(key, field.input[key])
                    }
                })
                break
            }
            case ('textarea'): {
                fieldsWrapper.append($('<div></div>').addClass('form-floating').attr('id', index))
                const inputWrapper = $(`#${index}.form-floating`)

                //check if label property exists. If not - just add an input form
                if (field.hasOwnProperty('label')) {
                    inputWrapper.append($(`<label>${field.label}</label>`).attr('for', `input${index}`))
                }

                //make an input form w/ all of its attributes
                const formInput = ($(`<textarea></textarea>`).addClass('form-control')).attr('id', `input${index}`)

                inputWrapper.prepend(formInput)
                Object.keys(field.input).forEach(key => {
                    if (key === 'required'){
                        formInput.prop(key, field.input[key])
                    } else {
                        formInput.attr(key, field.input[key])
                    }
                })
                break
            }
            case ('file'): {
                fieldsWrapper.append($('<div></div>').addClass('input-group').attr('id', index))
                const inputWrapper = $(`#${index}.input-group`)

                //make an input form w/ all of its attributes
                const formInput = ($(`<input/>`).addClass('form-control')).attr('id', `input${index}`)

                inputWrapper.prepend(formInput)
                Object.keys(field.input).forEach(key => {
                    formInput.attr(key, field.input[key])
                })

                //check if label property exists. If not - just add an input form
                if (field.hasOwnProperty('label')) {
                    inputWrapper.append($(`<label>${field.label}</label>`).addClass('input-group-text').attr('for', `input${index}`))
                }
                break
            }
            case ('checkbox'): {
                console.log(field.input.type)
                break
            }
        }
    })
}

const renderReferences = (references) => {
    // console.log(`References: ${references}`)
}


const buildForm = (result) => {
    const data = JSON.parse(result)
    wrapper.html('')
    const keys = Object.keys(data)
    for (let key of keys) {
        switch (key) {
            case 'name': {
                wrapper.append($(`<div><p>Name: ${data.name}</p></div>`).addClass('form-name'))
                break
            }
            case 'buttons': {
                renderButtons(data.buttons)
                break
            }
            case 'fields': {
                renderFields(data.fields)
                break
            }
            case 'references': {
                renderReferences(data.references)
                break
            }
        }
    }
}
