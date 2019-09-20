
let url = 'https://wayscript.com/api?'

let size;
let rangoli_result;
let submit_button = document.getElementById("submit");
let rangoli_parent = document.getElementById("rangoli_space");
let background_selector = document.getElementById("background-colors");
let selector_colors;
let output_lines;
let para;
let curr_span;
let all_spans;
let CSS_COLOR_NAMES = ["AliceBlue","AntiqueWhite","Aqua","Aquamarine","Azure","Beige","Bisque","Black","BlanchedAlmond","Blue","BlueViolet","Brown","BurlyWood","CadetBlue","Chartreuse","Chocolate","Coral","CornflowerBlue","Cornsilk","Crimson","Cyan","DarkBlue","DarkCyan","DarkGoldenRod","DarkGray","DarkGrey","DarkGreen","DarkKhaki","DarkMagenta","DarkOliveGreen","DarkOrange","DarkOrchid","DarkRed","DarkSalmon","DarkSeaGreen","DarkSlateBlue","DarkSlateGray","DarkSlateGrey","DarkTurquoise","DarkViolet","DeepPink","DeepSkyBlue","DimGray","DimGrey","DodgerBlue","FireBrick","FloralWhite","ForestGreen","Fuchsia","Gainsboro","GhostWhite","Gold","GoldenRod","Gray","Grey","Green","GreenYellow","HoneyDew","HotPink","IndianRed","Indigo","Ivory","Khaki","Lavender","LavenderBlush","LawnGreen","LemonChiffon","LightBlue","LightCoral","LightCyan","LightGoldenRodYellow","LightGray","LightGrey","LightGreen","LightPink","LightSalmon","LightSeaGreen","LightSkyBlue","LightSlateGray","LightSlateGrey","LightSteelBlue","LightYellow","Lime","LimeGreen","Linen","Magenta","Maroon","MediumAquaMarine","MediumBlue","MediumOrchid","MediumPurple","MediumSeaGreen","MediumSlateBlue","MediumSpringGreen","MediumTurquoise","MediumVioletRed","MidnightBlue","MintCream","MistyRose","Moccasin","NavajoWhite","Navy","OldLace","Olive","OliveDrab","Orange","OrangeRed","Orchid","PaleGoldenRod","PaleGreen","PaleTurquoise","PaleVioletRed","PapayaWhip","PeachPuff","Peru","Pink","Plum","PowderBlue","Purple","RebeccaPurple","Red","RosyBrown","RoyalBlue","SaddleBrown","Salmon","SandyBrown","SeaGreen","SeaShell","Sienna","Silver","SkyBlue","SlateBlue","SlateGray","SlateGrey","Snow","SpringGreen","SteelBlue","Tan","Teal","Thistle","Tomato","Turquoise","Violet","Wheat","White","WhiteSmoke","Yellow","YellowGreen"];
let seen_chars = new Map()

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

for (let color of CSS_COLOR_NAMES) {
    selector_colors = document.createElement('option');
    selector_colors.value = color;
    selector_colors.textContent = color;
    background_selector.appendChild(selector_colors);
}

background_selector.addEventListener('change', function(event) {
    console.log(event.target)
    // all_spans = document.getElementsByClassName("rangoli_char");
    // for (let char of all_spans) {
    //     char.style.backgroundColor = event.target.value;
    // }
    rangoli_parent.style.backgroundColor = event.target.value;
})

let params = {
    api_key: 'HRLP2pxChqSxV1uUFCnPeUo7OmXMTH0OePNsvb7OPww',  //# insert api key
    program_id: 8192,            //# insert program id
    variables: 10       //# (optional)
}

function getRandomColor() {
    ind = Math.floor(Math.random()*CSS_COLOR_NAMES.length)
    return CSS_COLOR_NAMES[ind]
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
        seen_chars.clear()
        $("#rangoli_space").empty();
        output_lines = rangoli_result.responseJSON.Result.body
        console.log(output_lines)
        let this_line_arr;
        let this_span_collection;
        for (let line of output_lines.results) {
            para = document.createElement("p");
            para.style.fontFamily = "Lucida Console"
            para.classList.add("rangoli");
            this_line_arr = line.split('')
            for (let char of this_line_arr) {
                if(!seen_chars.has(char)) {
                    seen_chars.set(char, getRandomColor());
                }
                curr_span = document.createElement("span")
                curr_span.style.color = seen_chars.get(char)
                curr_span.style.padding = 0
                curr_span.textContent = char
                curr_span.classList.add('rangoli_char')
                para.appendChild(curr_span);
            }
            // para.textContent = line;
            rangoli_parent.appendChild(para);
            console.log(para)
        }
})

})
