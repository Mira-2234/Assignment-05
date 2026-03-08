console.log("Hello javascript");

let allIssues =[];
async function loadIssues() {


const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
const data = await res.json()
allIssues = data.data

displayIssues(allIssues);

}

loadIssues()

async function searchInput(searchText) {
    const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchText}`)
    const data = await res.json()
    displayIssues(data.data)
    
}

document.getElementById("searchInput")
.addEventListener("keyup", function(){
    const searchText = this.value 
    if(searchText === ""){
        displayIssues(allIssues)
        return;
    }

    searchInput(searchText);
})

// Data count

function updateIssueCounter(){
    const total = allIssues.length
    document.getElementById("totalIssues").innerText = total;
}

async function loadIssues() {
    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    const data = await res.json()

    allIssues = data.data

    displayIssues(allIssues)
    updateIssueCounter()
    
}


function updateIssueCounter(){
    const total = allIssues.length
    const open = allIssues.filter(issue => issue.status === "open").length
    const closed = allIssues.filter(issue => issue.status === "closed").length
    document.getElementById("totalIssues").innerText = total
}
// Create issue card
function displayIssues(issues){
    const container = document.getElementById("issuesContainer")

    container.innerHTML = "";
    issues.forEach(issue => {

        let priorityColor = ""

        if(issue.priority === "high"){
            priorityColor = "bg-red-100 text-red-500"

        } else if(issue.priority === "medium"){
            priorityColor = "bg-yellow-100 text-yellow-600 "
        } else{
            priorityColor = "bg-gray-200 text-gray-600"
        }

        // labels array
        const labelStyles ={
            bug:{
                icon: "fa-solid fa-bug",    
            color:"bg-red-100 text-red-600"
            },

            "help wanted": {
            color: "bg-yellow-200 text-yellow-700",
            icon: "fa-regular fa-life-ring"
         },
            enhancement:{ 
                color: "bg-green-200 text-green-700",
                icon: "fa-solid fa-wand-magic-sparkles"

            },
            "good first issue":{ 
                color:"bg-green-200 text-green-700",
                icon: "fa-solid fa-leaf"

            },

            documentation:{
                color:"bg-green-200 text-green-700",
                icon:"fa-solid fa-book"


            }
        };

        const labelsHTML = issue.labels.map(label =>{
            const style = labelStyles[label]|| {
                color: "'bg-gray-200 text-gray-700",
                icon: "fa-solid fa-tag"
            };

            return `<span class=" inline-block mt-1 px-2 py-1 rounded-full text-sm mr-1 text-[12px] ${style.color}"><i class="${style.icon}"></i>
            ${label}</span>`;}).join("");

            const labelsWrapper = `
            <div class=" border-b border-gray-200 mx-2 pb-3">
            ${labelsHTML} 
            </div>`;


        const card = document.createElement("div")
        card.className= "border rounded p-4 shadow-md hover:shadow-lg transition"  
        
        // top border color in card
        if(issue.status === "open"){
            card.classList.add("border-t-4", "border-green-500")
        }else{
            card.classList.add("border-t-4", "border-purple-500")
        }

        

       let statusIcon;
       let statusBg;

       if(issue.status.toUpperCase()=== "CLOSED"){
        statusIcon = "./assets/Closed- Status .png";
        statusBg = "bg-purple-100";
       } else{
        statusIcon =  "./assets/Open-status.png";
        statusBg = "bg-green-100"
       }
        card.innerHTML=`
        
        <div class=" flex justify-between items-center mb-3">
        <div class="w-5 h-5 ${statusBg} items-center justify-center rounded-full">
        <img onclick="openIssue(${issue.id})" class="cursor-pointer" src="${statusIcon}" alt="">
        </div>

        

        <span class="${priorityColor} px-3 py-1 rounded-full text-sm" >${issue.priority.toUpperCase()}</span>

        </div>


        <h2 class="font-semibold text-[#1F2937] pb-7">${issue.title}</h2>



        <p class="text-[#64748B] text-[12px] line-clamp-2">${issue.description}</p>
         

        ${labelsWrapper}
        

        </div>
        <p class="mt-2 text-[13px] font-medium text-[#64748B] ">${issue.author}</p>

        <p class="text-[12px] text-gray-500">${issue.createdAt}</p>`
        // card click modal 
        
        card.addEventListener("click", () =>{
            const modal = document.getElementById("modal")
        
            modal.innerHTML= `
            <h2>${issue.title}</h2>
            <p>${issue.description}</p>
            <p>${issue.author}</p>`
        
            modal.style.display = "block"
        })

        container.appendChild(card)
    });
}




// All issues showing
function filterIssues(status){
    if(status === "all"){
        displayIssues(allIssues)
        return;
    }
    
    else{
        const filtered = allIssues.filter(issue => issue.status === status)
        
        displayIssues(filtered)
    }
}

function filterIssues(status, element){

const buttons = document.querySelectorAll(".tab-btn")

buttons.forEach(btn=>{
btn.classList.remove("bg-blue-600","shadow-md", "text-white")
})

element.classList.add("bg-blue-600","shadow-md", "text-white")

if(status === "all"){
displayIssues(allIssues)
return
}

const filtered = allIssues.filter(issue => issue.status === status)

displayIssues(filtered)

}


// pop-up Modal open
async function openIssue(id) {
    const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`);
    const data = await res.json();
    const issue = data.data;

    // Data set 
    document.getElementById("modalTitle").innerText = issue.title;
    document.getElementById("modalDescription").innerText = issue.description;
    document.getElementById("modalAssignee").innerText = issue.assignee;
    document.getElementById("modalAssigneeName").innerText = issue.assignee;
    document.getElementById("modalPriority").innerText = issue.priority;

//   pop-up modal showing
    const modal = document.getElementById("issueModal");
    modal.classList.remove("hidden");
    modal.classList.add("flex");
}

// pop-up modal close
function closeModal() {
    const modal = document.getElementById("issueModal");
    modal.classList.add("hidden");
    modal.classList.remove("flex");
}



