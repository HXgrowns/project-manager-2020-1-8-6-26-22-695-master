let sData = [];
const seletedDelete = () => {
  let DeleteLayout = document.getElementById("isDelete");
  DeleteLayout.style.display = "block";
}

const unseleteDelete = () => {
  let DeleteLayout = document.getElementById("isDelete");
  DeleteLayout.style.display = "none";
}

const getSuccess = (result) => {
  let active = 0;
  let pending = 0;
  let closed = 0;
  let itemsEle = document.getElementById("items");
  itemsEle.innerHTML = `<li class="table table-header">
  <div class="item-name">项目名称</div>
  <div class="item-describe">项目描述</div>
  <div class="deadline">
    截止时间
    <span id="order" class="iconfont sort order" onclick="order()">&#xe645</span>
    <span id="decOrder" class="iconfont sort des-order" onclick="decOrder()">&#xe62a</span>
  </div>
  <div class="status">状态</div>
  <div class="operation">操作</div>
</li>`;
  result.forEach((value) => {
    let item = `
      <li id="item-${value.id}" class="table table-content">
      <div class="item-name">${value.name}</div>
      <div class="item-describe">
        <p class="describe-content">
          ${value.description}
        </p>
      </div>
      <div class="deadline">${value.endTime}</div>
      <div class="status ${value.status}">${value.status}</div>
      <div class="operation"><button id="${value.id}" class="delete-button button" onclick="seletedDelete()">删除</button></div>
    </li>`;
    itemsEle.innerHTML += item;
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
  document.getElementById("all").innerText = result.length;
  document.getElementById("active").innerText = active;
  document.getElementById("pending").innerText = pending;
  document.getElementById("closed").innerText = closed;
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
        options.success(xhr.response);
      }
    }
  } catch (err) {
    options.fail(err);
  }
}

window.onload = () => {
  let options = {
    url: "http://localhost:3000/projects",
    method: "GET",
    headers: {},
    data: "",
    success: function (data) {
      getSuccess(JSON.parse(data));
      sData = JSON.parse(data);
    },
    fail: function (error) { }
  }
  request(options);
}

document.getElementById("items").addEventListener('click', (e) => {
  if (e.target) {
    let idStr = e.target.getAttribute("id");
    let id = parseInt(idStr);
    document.getElementById("confirm").addEventListener('click', () => {
      let options = {
        url: `http://localhost:3000/projects/${id}`,
        method: "DELETE",
        headers: {},
        data: "",
        success: function (e) {
          location.reload();
        },
        fail: function (error) {
        }
      }
      request(options);
    });
  }
});

const order = () => {
  sData.sort((a, b) => {
    return b.endTime > a.endTime ? 1 : -1;
  });
  getSuccess(sData);
}

const decOrder = () => {
  sData.sort((a, b) => {
    return b.endTime < a.endTime ? 1 : -1;
  });
  getSuccess(sData);
}