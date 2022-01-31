let nameField=document.getElementById('name');
let emailField=document.getElementById('email');
let genderField=document.getElementById('gender');
let phoneField=document.getElementById('phone');
let otherCountryField=document.getElementById('other-country');
let country=document.getElementById('country');
let inputValid={name:[false,nameField],email:[false,emailField],gender:[false,genderField],country:[false,country],otherCountry:[false,otherCountryField],phone:[false,phoneField]};
const validationVisibility=(inputField,isValid)=>{
    let classInfo=inputField.getAttribute('class');
    if(isValid){
        if(inputField.getAttribute('class').indexOf('is-invalid')!=-1)
            classInfo=classInfo.replace('is-invalid','is-valid');
        else if(inputField.getAttribute('class').indexOf('is-valid')==-1)
            classInfo+=' is-valid';
    }
    else{
        if(inputField.getAttribute('class').indexOf('is-valid')!=-1)
            classInfo=classInfo.replace('is-valid','is-invalid');
        else if(inputField.getAttribute('class').indexOf('is-invalid')==-1)
            classInfo+=' is-invalid';
    }
    inputField.setAttribute('class',classInfo);
}
const validateInput=(inputField,regex)=>{
    let isValid=regex.test(inputField.value);
    validationVisibility(inputField,isValid);
    return isValid;
}
nameField.oninput=()=>{
    inputValid['name'][0]=validateInput(nameField,/^[a-zA-Z ]{2,30}$/);
}
emailField.oninput=()=>{
    inputValid['email'][0]=validateInput(emailField,/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
}
genderField.onchange=()=>{
    inputValid['gender'][0]=true;
    validationVisibility(inputValid['gender'][1],true);
}
country.onchange=()=>{
    if(country.value=='Other'){
        otherCountryField.removeAttribute('disabled');
        inputValid['country'][0]=true;
        inputValid['otherCountry'][0]=false;
        validationVisibility(inputValid['country'][1],true);
        validationVisibility(inputValid['otherCountry'][1],false);
    }
    else{
        otherCountryField.setAttribute('disabled',true);
        validationVisibility(inputValid['otherCountry'][1],true);
        inputValid['otherCountry'][0]=true;
        if(country.value=='Bangladesh'){
            inputValid['country'][0]=true;
            validationVisibility(inputValid['country'][1],true);
        }
    }
}
otherCountryField.oninput=()=>{
    inputValid['otherCountry'][0]=validateInput(otherCountryField,/^[A-Za-z]{2,56}$/);
}
phoneField.oninput=()=>{
    inputValid['phone'][0]=validateInput(phoneField,/^\d{4,15}$/);
}
const delete_edu_fields=(element)=>{
    const parentElement=element.parentNode.parentNode.parentNode.parentNode;
    parentElement.remove();
}
let education_info=document.getElementById('education-info');
let add_more_edu=document.getElementById('add-more-btn');
add_more_edu.onclick=()=>{
    let divElement = document.createElement("div");
    divElement.innerHTML=`<div class="row">
                                                <div class="col-sm-6 mb-3">
                                                <input type="text" class="form-control form-control-sm degree" placeholder="Degree name" aria-label="Degree name" name="degree"/>
                                                </div>
                                                <div class="col-sm-6 mb-3">
                                                <div class="row">
                                                    <div class="col-9">
                                                    <input type="text" class="form-control form-control-sm year" placeholder="Passing Year" aria-label="Passing Year" name="year"/>
                                                    </div>
                                                    <div class="col-3">
                                                    <button type="button" class="btn btn-sm purple-btn delete-btn" onclick="delete_edu_fields(this)">X</button>
                                                    </div>
                                                </div>
                                                </div>
                                            </div>`;
    education_info.append(divElement);
}
const showAlert=document.getElementById('show-alert');
let form=document.getElementById('forms');
let submittedSection=document.getElementById('submitted-form');
let alertText=document.getElementById('alert-text');
form.onsubmit=(e)=>{
    e.preventDefault();
    let flag=1;
    for(const key in inputValid) {
        if(inputValid[key][0]==false){
            validationVisibility(inputValid[key][1],inputValid[key][0]);
            flag=0;
        }
    }
    if(flag==1){
        let formArr=$('#forms').serializeArray();
        let formObj = {'degree':[],'year':[]};
        for(let i=0;i<formArr.length;i++){
            if(formArr[i]['name']=='degree'){
                while(formArr[i]['name']=='degree'){
                    if(formArr[i]['value'].length>0 || formArr[i+1]['value'].length>0){
                        formObj[formArr[i]['name']].push(formArr[i]['value']);
                        formObj[formArr[i+1]['name']].push(formArr[i+1]['value']);
                    }
                    i+=2;
                }
            }
            formObj[formArr[i]['name']]=formArr[i]['value'];
        }
        $.post('echo.php',{
            form_data:JSON.stringify(formObj)
        }, function(data,status){
            if(status == 'success'){
                submittedSection.innerHTML=data;
                alertText.innerText='Form Submitted Successfully';
            }
            else
                alertText.innerText='Form Submission Failed!!!';
            showAlert.style.display='block';
            setTimeout(()=>{showAlert.style.display='none'},1000);
        });
    }
}