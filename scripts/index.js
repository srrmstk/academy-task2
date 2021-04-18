let wrapper = $('#formWrapper')

const clearForm = () => {
    wrapper.html('')
}

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
            case ('password'):
            case ('email'): {
                fieldsWrapper.append($('<div></div>').addClass('form-input').attr('id', index))
                const inputWrapper = $(`#${index}.form-input`)

                //check if label property exists. If not - just add an input form
                if (field.hasOwnProperty('label')) {
                    inputWrapper.append($(`<label>${field.label}</label>`).addClass('form-label').attr('for', `input${index}`))
                }

                //make an input form w/ all of its attributes
                const formInput = ($(`<input/>`).addClass('form-control')).attr('id', `input${index}`)

                inputWrapper.append(formInput)
                Object.keys(field.input).forEach(key => {
                    if (key === 'required') {
                        formInput.prop(key, field.input[key])
                    } else {
                        formInput.attr(key, field.input[key])
                    }
                })
                break
            }
            case ('textarea'): {
                fieldsWrapper.append($('<div></div>').addClass('form-input').attr('id', index))
                const inputWrapper = $(`#${index}.form-input`)

                //check if label property exists. If not - just add an input form
                if (field.hasOwnProperty('label')) {
                    inputWrapper.append($(`<label>${field.label}</label>`).addClass('form-label').attr('for', `input${index}`))
                }

                //make an input form w/ all of its attributes
                const formInput = ($(`<textarea></textarea>`).addClass('form-control')).attr('id', `input${index}`)

                inputWrapper.append(formInput)
                Object.keys(field.input).forEach(key => {
                    if (key === 'required') {
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
                    if (key === 'required' || key === 'multiple') {
                        formInput.prop(key, field.input[key])
                    } else if (key === 'filetype') {
                        formInput.attr('accept', `.${field.input[key].join(',.')}`)
                    } else {
                        formInput.attr(key, field.input[key])
                    }
                })

                //check if label property exists. If not - just add an input form
                if (field.hasOwnProperty('label')) {
                    inputWrapper.append($(`<label>${field.label}</label>`).addClass('input-group-text').attr('for', `input${index}`))
                }
                break
            }
            case ('date'): {
                fieldsWrapper.append($('<div></div>').addClass('form-date').attr('id', index))
                const inputWrapper = $(`#${index}.form-date`)

                //check if label property exists. If not - just add an input form
                if (field.hasOwnProperty('label')) {
                    inputWrapper.append($(`<label>${field.label}</label>`).addClass('form-date-label').attr('for', `input${index}`))
                }


                //make an input form w/ all of its attributes
                const formInput = ($(`<input/>`).addClass('form-control')).attr('id', `input${index}`)

                inputWrapper.append(formInput)

                Object.keys(field.input).forEach(key => {
                    if (key === 'required') {
                        formInput.prop(key, field.input[key])
                    } else {
                        formInput.attr(key, field.input[key])
                    }
                })
                break
            }
            case ('color'): {
                fieldsWrapper.append($('<div></div>').addClass('form-control').attr('id', index))
                const inputWrapper = $(`#${index}.form-control`)

                //check if label property exists. If not - just add an input form
                if (field.hasOwnProperty('label')) {
                    inputWrapper.append($(`<label>${field.label}</label>`).addClass('form-label').attr('for', `input${index}`))
                }

                //make an input form w/ all of its attributes
                const formInput = ($(`<input/>`).addClass('form-control')).attr('id', `input${index}`)

                inputWrapper.append(formInput)
                Object.keys(field.input).forEach(key => {
                    if (key === 'colors') {
                        formInput.attr({list: 'colors', value: field.input[key][0]})
                        inputWrapper.append($(`<datalist></datalist>`).attr('id', 'colors'))
                        for (let i of field.input[key]) {
                            $('#colors').append($(`<option></option>`).attr('value', i))
                        }
                    } else {
                        formInput.attr(key, field.input[key])
                    }
                })

                break
            }
            case ('checkbox'): {
                fieldsWrapper.append($('<div></div>').addClass('form-check').attr('id', index))
                const inputWrapper = $(`#${index}.form-check`)

                //check if label property exists. If not - just add an input form
                if (field.hasOwnProperty('label')) {
                    inputWrapper.append($(`<label>${field.label}</label>`).addClass('form-check-label').attr('for', `input${index}`))
                }

                //make an input form w/ all of its attributes
                const formInput = ($(`<input/>`).addClass('form-check-input')).attr('id', `input${index}`)

                inputWrapper.prepend(formInput)
                Object.keys(field.input).forEach(key => {
                        if (key === 'checked') {
                            field.input[key] === "false" || field.input[key] === false
                                ? formInput.removeAttr(key)
                                : formInput.attr(key, field.input[key])
                        } else {
                            formInput.attr(key, field.input[key])
                        }
                    }
                )
                break
            }
            case ('number'): {
                fieldsWrapper.append($('<div></div>').addClass('form-input').attr('id', index))
                const inputWrapper = $(`#${index}.form-input`)

                //check if label property exists. If not - just add an input form
                if (field.hasOwnProperty('label')) {
                    inputWrapper.append($(`<label>${field.label}</label>`).addClass('form-label').attr('for', `input${index}`))
                }

                //make an input form w/ all of its attributes
                const formInput = ($(`<input/>`).addClass('form-control')).attr('id', `input${index}`)

                inputWrapper.append(formInput)
                Object.keys(field.input).forEach(key => {
                    if (key === 'required') {
                        formInput.prop(key, field.input[key])
                    } else if (key === 'mask') {
                        formInput.attr('type', 'text')
                        formInput.mask(field.input[key])
                    } else {
                        formInput.attr(key, field.input[key])
                    }
                })
                break
            }
            case ('technology'): {
                fieldsWrapper.append($('<div></div>').addClass('form-control').attr('id', index))
                const inputWrapper = $(`#${index}.form-control`)

                //check if label property exists. If not - just add an input form
                if (field.hasOwnProperty('label')) {
                    inputWrapper.append($(`<label>${field.label}</label>`).addClass('form-label').attr('for', `input${index}`))
                }

                //make an input form w/ all of its attributes
                const formInput = ($(`<select></select>`).addClass('form-select')).attr('id', `input${index}`)

                inputWrapper.append(formInput)
                Object.keys(field.input).forEach(key => {
                    if (key === 'technologies') {
                        for (let i of field.input[key]) {
                            formInput.append($(`<option>${i}</option>`))
                        }
                    } else {
                        formInput.attr(key, field.input[key])
                    }
                })
                // <select className="form-select" aria-label="Default select example">
                //     <option selected>Open this select menu</option>
                //     <option value="1">One</option>
                //     <option value="2">Two</option>
                //     <option value="3">Three</option>
                // </select>
                break
            }
        }
    })
}

const renderReferences = (references) => {
    wrapper.append($(`<div></div>`).addClass('form-references-wrapper'))
    let referencesWrapper = $('.form-references-wrapper')
    references.forEach((item) => {
        if (item.hasOwnProperty('input')) {
            const refInput = ($(`<input/>`).addClass('form-check-input'))
            referencesWrapper.append(refInput)
            Object.keys(item.input).forEach(key => {
                    if (key === 'checked') {
                        item.input[key] === "false" || item.input[key] === false
                            ? refInput.removeAttr(key)
                            : refInput.attr(key, field.input[key])
                    } else {
                        refInput.attr(key, item.input[key])
                    }
                }
            )
        }
        if (item.hasOwnProperty('text without ref')) {
            referencesWrapper.append(`<div>${item["text without ref"]}</div>`)
        }
        if (item.hasOwnProperty('ref')) {
            referencesWrapper.append($(`<a>${item.text}</a>`).attr('href', item.ref))
        }
    })
}

const buildForm = (result) => {
    const data = JSON.parse(result)
    clearForm()
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
