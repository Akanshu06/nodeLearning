const input1 = document.getElementById("input1");
const input2 = document.getElementById("input2");
const input3 = document.getElementById("input3");

const Button1 = document.getElementById("button1");

const todo = document.getElementById('todo');
const show1 = document.getElementById('show1');

Button1.addEventListener("click", saveToAPI);

function saveToAPI(event) {
    event.preventDefault();
    const newName = input1.value;
    const newPhone = input2.value;
    const newAddress = input3.value;
    
    let obj = { Name: newName, Phone: newPhone, Address: newAddress };

    axios.post("https://crudcrud.com/api/ac18f654c355486da110e089096e310b/StudentManager", obj)
        .then((response) => {
            showdata(response.data);
            input1.value = ''; // Clear input fields after submission
            input2.value = '';
            input3.value = '';
        })
        .catch((err) => {
            console.log(err);
            document.body.innerHTML = document.body.innerHTML + "<h4>something went wrong</h4>";
        });
}

todo.addEventListener("click", (event) => {
    if (event.target.classList.contains("delete-btn")) {
        const id = event.target.parentElement.id;
        axios.delete(`https://crudcrud.com/api/ac18f654c355486da110e089096e310b/StudentManager/${id}`)
            .then((response) => {
                console.log(response);
                const studentToDelete = event.target.parentElement;
                todo.removeChild(studentToDelete);
                count_change_karo();
                showing_total();
            })
            .catch((error) => {
                console.log(error);
            });
    } else if (event.target.classList.contains("edit-btn")) {
        editItem(event.target.parentElement);
    }
});

// Fetching Data on Page Load
window.addEventListener("DOMContentLoaded", () => {
    axios.get("https://crudcrud.com/api/ac18f654c355486da110e089096e310b/StudentManager")
        .then((response) => {
            for (let i = 0; i < response.data.length; i++) {
                showdata(response.data[i]);
            }
            count_change_karo(); // Update counts after fetching data
            showing_total(); // Update counts after fetching data
        })
        .catch((error) => {
            console.log(error);
        });
});

function count_change_karo() {
    const listItems = document.querySelectorAll('#todo li');
    let count = listItems.length;
    show1.innerHTML = count;
}

function showing_total() {
    const listItems = document.querySelectorAll('#todo li');
    let count = 0;
    for (let i = 0; i < listItems.length; i++) {
        if (listItems[i].style.display == "flex") {
            count++;
        }
    }
}

function showdata(object) {
    const newli = document.createElement("li");
    const newh1 = document.createElement("h1");
    const newh4 = document.createElement("h4");

    newh1.innerHTML = object.Name;
    newh4.innerHTML = `Phone: ${object.Phone}, Address: ${object.Address}`;

    newli.appendChild(newh1);
    newli.appendChild(newh4);

    todo.appendChild(newli);

    const newDelete = document.createElement("button");
    const newEdit = document.createElement("button");
    const newDeleteText = document.createTextNode("delete");
    const newEditText = document.createTextNode("edit");

    newDelete.appendChild(newDeleteText);
    newEdit.appendChild(newEditText);

    newDelete.className = "delete-btn";
    newEdit.className = "edit-btn";

    newli.appendChild(newDelete);
    newli.appendChild(newEdit);

    newli.id = object._id;

    count_change_karo();
}

function editItem(listItem) {
    const id = listItem.id;
    const newName = prompt("Enter new name:", listItem.querySelector("h1").innerHTML);
    const newPhone = prompt("Enter new phone:", listItem.querySelector("h4").innerHTML.split(',')[0].split(': ')[1]);
    const newAddress = prompt("Enter new address:", listItem.querySelector("h4").innerHTML.split(',')[1].split(': ')[1]);
    const updatedObj = { Name: newName, Phone: newPhone, Address: newAddress };

    axios.put(`https://crudcrud.com/api/ac18f654c355486da110e089096e310b/StudentManager/${id}`, updatedObj)
        .then((response) => {
            console.log(response);
            listItem.querySelector("h1").innerHTML = newName;
            listItem.querySelector("h4").innerHTML = `Phone: ${newPhone}, Address: ${newAddress}`;
        })
        .catch((error) => {
            console.log(error);
        });
}
