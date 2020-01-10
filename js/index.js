const seletedDelete = () => {
  let DeleteLayout = document.getElementById("isDelete");
  DeleteLayout.style.display = "block";
}

const unseleteDelete = () => {
  let DeleteLayout = document.getElementById("isDelete");
  DeleteLayout.style.display = "none";
}

var request = function (options) {
  let xhr = new XMLHttpRequest();
  xhr.open(options.method || "GET", options.url);
  try {
    xhr.send(options.data);
    xhr.onload = function () {
      if (xhr.status != 200) {
        options.fail(xhr.statusText);
      } else {
        options.success(xhr.responseText);
      }
    }
  } catch (err) {
    options.fail(err);
  }
}

let options = {
  url: "http://localhost:3000/projects",
  method: "GET",
  headers: {},   // 传给
  data: "",     // 传给服务器的参数
  success: function (result) { },  // 请求成功后调用此方法
  fail: function (error) { }    // 请求失败或出错后调用此方法
}
options.success = (result) => {
  console.log(result);
  let active = 0;
  let pending = 0;
  let closed = 0;
  JSON.parse(result).forEach((value) => {
    let item = `
      <li class="table table-content">
      <div class="item-name">${value.name}</div>
      <div class="item-describe">
        <p class="describe-content">
          ${value.description}
        </p>
      </div>
      <div class="deadline">${value.endTime}</div>
      <div class="status ${value.status}">${value.status}</div>
      <div class="operation"><button class="delete-button button" onclick="seletedDelete()">删除</button></div>
    </li>`;
    document.getElementById("items").innerHTML += item;
    if (value.status === "ACTIVE") {
      active++;
    }
    if (value.status === "PENDING") {
      pending++;
    }
    if (value.status === "CLOSED") {
      closed++;
    }
  });
  document.getElementById("all").innerText = JSON.parse(result).length;
  document.getElementById("active").innerText = active;
  document.getElementById("pending").innerText = pending;
  document.getElementById("closed").innerText = closed;
}

const data = request(options);