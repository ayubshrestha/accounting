<template>
 <ul class="root" >
    <li style="padding: 20px;" v-for="(coa, index) in coaList" :key="index">
        <details>
            <summary> <span class="coaBtn" :class="`${coa.name === activeCoa ? 'ft_active_coa' : ''}`" @click="clickCoa(coa)" >{{ coa.name }}</span></summary>
            <ul class="tree">
                <li v-for="(c, ci) in coa.children" :key="ci">
                    <details>
                        <summary>
                            <div style="display: flex; position: relative; top: -40px;">
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
                                    <span
                                        @click="childCoaClicked(c.name, coa, ci, index)"
                                        :class="`${c.name === activeChildCoa ? 'ft_active_child_coa' : ''}`"
                                        class="coa_child"
                                    >
                                        {{ c.name }}
                                    </span>
                            </div>
                        </summary>
                        <div v-if="c.name === activeChildCoa" class="add-view-edit-btns">
                            <div  @click="viewDetail(c.name)" style="cursor: pointer"><i :class="`${openViewDetail ? 'hightlight_icon' : ''}`" style="height: 24px; position: relative; top: 24px; left: 14px; color: #2D9BB7;" class="fa fa-eye" aria-hidden="true"></i></div> 
                            <div  @click="editAccountCOA(c.name)" style="cursor: pointer"><i style="height: 24px; position: relative; top: 24px; left: 20px; color: #2D9BB7;" class="fa fa-pencil" aria-hidden="true"></i></div>
                            <div  @click="addGroup(c.name)" style="cursor: pointer">
                            <img
                            style="height: 24px; position: relative; top: 25px; left: 27px;"
                            src="../assets/Group73.png"
                            alt="add"
                            />
                          </div>
                          <div @click="addAccount()" style="cursor: pointer">
                            <img
                            style="height: 24px; position: relative; top: 24px; left: 32px;"
                            src="../assets/account.png"
                            alt="add"
                            />
                          </div>
                        </div>
                        <ul class="sub-tree">
                          <div v-if="addAccountClicked && c.name === activeChildCoa" style="position: relative;left: 40px;top:-8px" >
                          <img
                            class="openFolderImg"
                            src="../assets/add_account.png"
                            alt="open"
                          />
                          <input class="addInput" v-model="newData" placeholder="Account Name" type="text" />
                          <input style="margin-left:5px" class="addInput" v-model="newAccDescription" placeholder="Description" type="text" />
                          <input style="margin-left:5px" class="addInput" v-model="newAccCode" placeholder="Code" type="text" />
                          <input style="margin-left:5px" class="addInput" v-model="newAccBalance" placeholder="Opening Balance" type="text" />
                          <button class="addBtn" @click="saveData(ci, index)">ADD</button>
                        </div>
                            <li style="position: relative; top: -25px; margin-bottom: -40px;" v-for="(sc, ind) in c.subChild">
                                <details>
                                    <summary>
                                      <div style="display: flex; position: relative;top: -20px; left: -20px;">
                                        <img
                                            class="closeFolderImg"
                                            src="../assets/close_folder.png"
                                            alt="open"
                                        />
                                            <span class="childCoa">
                                              {{ sc.subChildName }}
                                            </span>
                                      </div>
                                    </summary>
                                </details>                                      
                            </li>
                        </ul>
                    </details>
                </li>
            </ul>
        </details>
    </li>
 </ul>
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
      addAccount() {
        // this.activeChildCoa = c;
        // this.addClicked = false;
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
    text-align: center;
    line-height: 50px;
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
    position: relative;
    top: 16px;
    left: -8px;
    width: 100px;
    height: 24px;
    background-color: #fefefe;
    border: 1px solid #e5e5e5;
    border-radius: 5px;
    margin-bottom: 20px;
    font-family: "Poppins", sans-serif;
    font-size: 12px;
    text-align: center;
    line-height: 26px;
    padding: 10px 40px;
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
    z-index: 1000;
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
      z-index: 1000;
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

  .root {
    display: flex;
    list-style-type: none;
  }
  .tree {
    position: relative;
    list-style-type: none;
    border-left: 1px dashed #a6a6a6;
    left: 20px
  }

  .sub-tree {
    position: relative;
    border-left: 1px dashed #a6a6a6;
    top: -80px;
    left: 36px;
    margin-top: 12px;
  }

  li {
    list-style-type: none;
  }

  .coa_child {
    background-color: #fefefe;
    border: 1px solid #e5e5e5;
    border-radius: 5px;
    margin-bottom: 20px;
    font-family: "Poppins", sans-serif;
    font-size: 12px;
    padding: 10px 40px;
    position: relative;
    top: 20px;
  }
  .tree summary {
    cursor: pointer;
  }

details summary::-webkit-details-marker,
details summary::marker {
 display: none; 
 content: "";
}

.tree li::before {
  position: relative;
    left: -40px;
    top: -1px;
    /* border-left: 1px dashed #A6A6A6; */
    border-bottom: 1px dashed #A6A6A6;
    content: "";
    width: 60px;
    height: 40px;
    display: block;
}

.sub-tree li::before {
    top: 20px;
    border-bottom: 1px dashed #A6A6A6;
    content: "";
    width: 40px;
}

.add-view-edit-btns {
  display: flex;
    position: relative;
    top: -100px;
    left: 215px;
}
.tree details[open] {
  margin-bottom: -75px;
}
.tree details {
  margin-bottom: -30px;
}
  </style>
  