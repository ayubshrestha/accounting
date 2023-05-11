<template>
  <div class="main_body">
  <div class="coaMain">
    
    <div v-for="(coa, index) in coaList" :key="index" class="coaFlex">
      <button
        class="coaBtn"
        :class="`${coa.name === activeCoa ? 'ft_active_coa' : ''}`"
        @click="clickCoa(coa)"
      >
        {{ coa.name }}
      </button>
      
      <div
        v-for="(c, ci) in coa.children"
        :key="ci"
        v-show="coa.showCoa" 
        class="child_coa_div"
      >
      <div style="display: flex;" class="mainChild">
        <div>
          <img
            class="openFolderImg"
            v-if="c.showChild"
            src="../assets/open_folder.png"
            alt="open"
          />
          <img
            class="closeFolderImg"
            v-if="!c.showChild"
            src="../assets/close_folder.png"
            alt="open"
          />
          <button
            class="childCoa"
            @click="childCoaClicked(c.name, coa, ci, index)"
            :class="`${c.name === activeChildCoa ? 'ft_active_child_coa' : ''}`"
          >
            {{ c.name }}
          </button>
        </div>
          <div v-if="c.name === activeChildCoa">
        <i :class="`${openViewDetail ? 'hightlight_icon' : ''}`" style="height: 24px; position: relative; top: 22px; left: 14px; color: #2D9BB7" class="fa fa-eye" aria-hidden="true" @click="viewDetail(c.name)"></i>
        <i style="height: 24px; position: relative; top: 22px; left: 20px; color: #2D9BB7" class="fa fa-pencil" aria-hidden="true" @click="editAccountCOA(c.name)"></i>
        <img
          style="height: 24px; position: relative; top: 29px; left: 27px"
          @click="addGroup(c.name)"
          src="../assets/Group73.png"
          alt="add"
        />
        <img
          style="height: 24px; position: relative; top: 29px; left: 32px"
          @click="addAccount(c.name)"
          src="../assets/account.png"
          alt="add"
        />
      </div>
      </div>
        <div v-if="addClicked && c.name === activeChildCoa" style="position: relative;left: 40px;top:-25px" >
          <img
            class="openFolderImg"
            src="../assets/open_folder.png"
            alt="open"
          />
          <input class="addInput" v-model="newGroupName" placeholder="Group Name" type="text" />
          <input style="margin-left:5px" class="addInput" v-model="newGroupDesciption" placeholder="Description" type="text" />
          <button class="addBtn" @click="saveData(ci, index)">ADD</button>
        </div>
        <div v-if="addAccountClicked && c.name === activeChildCoa" style="position: relative;left: 40px;top:-25px" >
          <img
            class="openFolderImg"
            src="../assets/add_account.png"
            alt="open"
          />
          <input class="addInput" v-model="newAccName" placeholder="Account Name" type="text" />
          <input style="margin-left:5px" class="addInput" v-model="newAccDescription" placeholder="Description" type="text" />
          <input style="margin-left:5px" class="addInput" v-model="newAccCode" placeholder="Code" type="text" />
          <input style="margin-left:5px" class="addInput" v-model="newAccBalance" placeholder="Opening Balance" type="text" />
          <button class="addBtn" @click="saveData(ci, index)">ADD</button>
        </div>
        <div
          v-for="(sc, ind) in c.subChild"
          v-show="c.showChild"
          style="position: relative; left: 60px;"
        >
          <button class="childCoa">
            {{ sc.subChildName }}
          </button>
        </div>
      
      </div>
    </div>
    <div v-show="openViewDetail">
      <div class="view_detail_container">
        <div class="detail_head">{{ acc_name }}</div>
        <div class="statement_button_section">
          <button class="overview_btn">Overview</button>
          <button class="statement_btn">Statement</button>
        </div>
        <div class="statement_table_section">
          <table class="statement_table">
            <thead>
              <tr>
                <th><span>Opening Balance</span></th>
                <th><span>Transaction (DR)</span></th>
                <th><span>Transaction (CR)</span></th>
                <th><span>Closing Balance</span></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>500 CR</td>
                <td>500 CR</td>
                <td>500 CR</td>
                <td>500 CR</td>
              </tr>
            </tbody>
          </table>
          <div style="float:right; font-size: 11px; margin: 10px 50px;"><span>As on 30-01-2023</span></div>
          <div style="float:left; font-size: 11px; margin: 10px 5px; color: #2a2a2a"><span>As on 30-01-2023</span></div>
          <div style="margin-top: 75px;font-size: 20px;font-weight: 500;color: #2a2a2a;">Latest Transactions</div>
          <table class="latest_transaction_table">
            <thead>
              <tr>
                <th>DATE</th>
                <th>TYPE</th>
                <th>TXN ID</th>
                <th>AMOUNT</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>2022-12-18</td>
                <td>Purchase Bill</td>
                <td>TX-123</td>
                <td>Rs. 1200</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: "coa",
  data() {
    return {
      coaList: [
        {
          name: "Assets",
          children: [
            {
              name: "Current Assets",
              editChild: false,
              showChild: false,
              subChild: [
                { subChildName: "Bank Accounts" },
                { subChildName: "Cash in hand" },
                { subChildName: "Deposits" },
                { subChildName: "Inventory" },
              ],
            },
            {
              name: "Non-Current Assets",
              editChild: true,
              showChild: false,
              subChild: [
                { subChildName: "Bank Accounts" },
                { subChildName: "Cash in hand" },
                { subChildName: "Deposits" },
                { subChildName: "Inventory" },
              ],
            },
          ],
          showCoa: false
        },
        {
          name: "Liabilities",
          children: [
            {
              name: "Current Liabilites",
              editChild: false,
            },
            {
              name: "Non-Current Liabilites",
              editChild: true,
            },
          ],
          showCoa: false
        },
        {
          name: "Income",
          children: [
            {
              name: "Direct Income",
              editChild: false,
            },
            {
              name: "Indirect Income",
              editChild: true,
            },
          ],
          showCoa: false
        },
        {
          name: "Expenses",
          children: [
            {
              name: "Direct Expenses",
              editChild: false,
            },
            {
              name: "Indirect Expenses",
              editChild: true,
            },
          ],
          showCoa: false
        },
        {
          name: "Equity",
          children: [
            {
              name: "Capital Accounts",
              editChild: false,
            },
            {
              name: "Reserve and Surplus",
              editChild: true,
            },
          ],
          showCoa: false
        },
      ],
      activeCoa: "",
      activeChildCoa: "",
      expandCoa: false,
      addClicked: false,
      addAccountClicked:false,
      expandChildCoa: false,
      newData: "",
      src: [
        { url: require("../assets/open_folder.png") },
        { url: require("../assets/close_folder.png") },
      ],
      currentSrc: 0,
      openViewDetail: false,
      acc_name: "",
      newAccName: "",
      newAccDescription: "",
      newAccCode: "",
      newAccBalance: ""
    };
  },
  methods: {
    clickCoa(coa) {
      if(coa.showCoa == false){
        coa.showCoa = true;
        this.activeCoa = coa.name;
      }
      else if(coa.showCoa == true && this.activeCoa === coa.name){
        this.activeCoa = "";
        coa.showCoa = false;
      }
      else if (coa.showCoa == true && this.activeCoa != coa.name){
        console.log(coa.name)
        this.activeCoa = coa.name
      }
      
    },
    childCoaClicked(coa,c, ci,i) {
      if(c.children[ci].showChild == false){
        console.log("1")
      c.children[ci].showChild = true;
      this.activeChildCoa = coa;
      }
      else if(c.children[ci].showChild == true && this.activeChildCoa === coa){
        console.log("2")
        this.activeChildCoa = ""
        c.children[ci].showChild = false;
      }
      else if(c.children[ci].showChild == true && this.activeChildCoa != coa){
        console.log("3")
        this.activeChildCoa = coa;
      }
    },
    addGroup(c) {
      this.activeChildCoa = c;
      this.addAccountClicked = false;
      this.addClicked = !this.addClicked;
    },
    addAccount(c) {
      this.activeChildCoa = c;
      this.addClicked = false;
      this.addAccountClicked = !this.addAccountClicked;
    },
    saveData(ci, index) {
      this.coaList[index].children[ci].subChild.push({
        subChildName: this.newData,
      });
      this.newData = "";
      this.addClicked = false;
    },
    viewDetail(name) {
      this.openViewDetail = !this.openViewDetail;
      this.acc_name = name
    },
    editAccountCOA(name) {
      console.log(name)
      this.addAccountClicked = !this.addAccountClicked;
    }
  },
};
</script>

<style>
.main_body {
  width: 90%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 50px;
  padding: 20px;
  border: 1px solid #a9a9a9;
  border-bottom: 0;
  border-radius: 5px 5px 0px 0px;
  height: 86vh;
}

.coaMain {
  display: flex;
  /* justify-content: space-between; */
  /* border-bottom: 1px solid black; */
}

.coaFlex {
  display: flex;
  flex-direction: column;
  /* position: fixed; */
}

.coaFlex:nth-child(2){
  position: absolute;
    left: 264px;
}
.coaFlex:nth-child(3){
  position: absolute;
    left: 429px;
}
.coaFlex:nth-child(4){
  position: absolute;
    left: 594px;
}
.coaFlex:nth-child(5){
  position: absolute;
    left: 759px;
}

.coaBtn {
  font-family: "Poppins", sans-serif;
  display: block;
  background-color: #fefefe;
  width: 150px;
  height: 50px;
  border: 1px solid #a9a9a9;
  border-radius: 5px;
  border-style: dashed;
  /* margin-right: 80px; */
}

.ft_active_coa {
  background-color: #dec6ff;
  border: 1px solid #8b8b8b;
  border-style: solid;
  font-weight: 500;
}

.ft_active_child_coa {
  background-color: #e8e8e8 !important;
  border: 1px solid #cecece !important;
  font-weight: 500;
}

.ft_active_line {
  width: 100%;
}

.childCoa {
  width: 170px;
  height: 40px;
  background-color: #fefefe;
  border: 1px solid #e5e5e5;
  border-radius: 5px;
  margin-bottom: 20px;
  font-family: "Poppins", sans-serif;
  font-size: 12px;
}
.child_coa_div {
  border-left: 1px solid black;
  left: 10px;
  position: relative;
}

.child_coa_div::before {
    content: "";
}
.child_coa_div::after {
  content: "";
}
.openFolderImg {
  position: relative;
  top: 18px;
  left: 15px;
  height: 24px;
  border-radius: 50%;
  padding: 10px;
  border: none;
  background-color: #CDF5FF;
}
.closeFolderImg {
    position: relative;
    top: 18px;
    left: 15px;
    height: 24px;
    border-radius: 50%;
    padding: 10px;
    border: none;
    background-color: #EEEEEE;
}
.addInput {
  padding-left: 20px;
  width: 150px;
  height: 35px;
  background-color: #fefefe;
  border: 1px solid #e5e5e5;
  border-radius: 5px;
  font-family: "Poppins", sans-serif;
  font-size: 12px;
}
::placeholder::-moz-focus-outer { 
        color: rgba(141, 138, 138, 0.664);
}
input:focus {
  outline-style: none;
  box-shadow: none;
}
.addBtn {
  background-color: #21D488;
  color: white;
  margin-left: 5px;
  border: none;
  border-radius: 5px;
  height: 35px;
  padding: 0px 20px;
  font-family: "Poppins", sans-serif;
}
.view_detail_container {
  width: 550px;
  height: 90vh;
  position: absolute;
  right: 0;
  top:50px;
  border: 4px solid #f3fef9;
  background-color: #fbfbfb;
}

.detail_head {
  margin-left: 20px;
  margin-top: 20px;
  font-size: 20px;
  font-weight: 500;
  color: #2a2a2a;

}
.statement_button_section {
  margin-left: 20px;
    margin-top: 10px;
}
.overview_btn {
  background-color: #21D488;
  width: 150px;
  height: 50px;
  font-family: "Poppins", sans-serif;
  border: none;
  border-radius: 5px;
  color: white;
  font-size: 16px;
  font-weight: 500;
}
.statement_btn {
  margin-left: 20px;
  background-color: #E4FFF4;
  width: 150px;
  height: 50px;
  font-family: "Poppins", sans-serif;
  border: none;
  border-radius: 5px;
  color: #21D488;
  font-size: 16px;
  font-weight: 500;
}
.statement_table_section {
  margin-top: 20px;
  margin-left: 20px;
}
.statement_table thead tr th {
  font-weight: 300;
  font-size: 12px;
  color: #2a2a2a;
  
}
.statement_table thead tr th span {
  margin-right: 20px;
  border-bottom: 1px solid gray;
}

.hightlight_icon {
color: #21D488;
}
.latest_transaction_table {
  border-collapse: collapse;
  margin-top: 20px;
}
.latest_transaction_table thead tr {
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  width: 500px;
}
.latest_transaction_table th, td {
  width: 125px;
  text-align: left;
}
.latest_transaction_table th {
  font-size: 14px;
  font-weight: 400;
}
.mainChild {
  
}
.mainChild::before {
  content: "";
}
.mainChild::after {
  content: ""
}
</style>
