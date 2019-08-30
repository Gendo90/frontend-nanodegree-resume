
let url = 'https://wayscript.com/api?'

let size;
let rangoli_result;
let submit_button = document.getElementById("submit");
let rangoli_parent = document.getElementById("rangoli_space")
let output_lines;
let para;

let first_state = ['--------e--------',
                    '------e-d-e------',
                    '----e-d-c-d-e----',
                    '--e-d-c-b-c-d-e--',
                    'e-d-c-b-a-b-c-d-e',
                    '--e-d-c-b-c-d-e--',
                    '----e-d-c-d-e----',
                    '------e-d-e------',
                    '--------e--------']

for (let line of first_state) {
    para = document.createElement("p");
    para.style.fontFamily = "Lucida Console"
    para.classList.add("rangoli");
    para.textContent = line;
    rangoli_parent.appendChild(para);
}

let params = {
    api_key: 'HRLP2pxChqSxV1uUFCnPeUo7OmXMTH0OePNsvb7OPww',  //# insert api key
    program_id: 8192,            //# insert program id
    variables: 10       //# (optional)
}

submit_button.addEventListener("click", function() {
    size = document.getElementById("input_size").value;
    //$.ajax call here!
    // params.variables = size;
    rangoli_result = $.ajax({
        url:`https://wayscript.com/api?api_key=HRLP2pxChqSxV1uUFCnPeUo7OmXMTH0OePNsvb7OPww&program_id=8192&variables=${size}`,
        method:"GET"
        }
    ).done(function() {
        console.log(rangoli_result)
        $("#rangoli_space").empty();
        output_lines = rangoli_result.responseJSON.Result.body
        console.log(output_lines)
        for (let line of output_lines.results) {
            para = document.createElement("p");
            para.style.fontFamily = "Lucida Console"
            para.classList.add("rangoli");
            para.textContent = line;
            rangoli_parent.appendChild(para);
        }
})

})
