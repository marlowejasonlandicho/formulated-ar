<template>
  <div>

    <!--     
    <span>
      <md-button class="md-fab md-mini">
        <md-icon>save</md-icon>
      </md-button>@md-selected="onSelect"
    </span>-->

    <md-table v-model="people" md-card >
      <md-table-toolbar>
        <!-- <h1 class="md-title">DTR Summary</h1> -->
        <md-button class="md-raised md-mini md-primary" @click="onAdd">Add</md-button>
        <md-button class="md-raised md-mini md-accent" @click="onPrint">Print</md-button>
        <!-- <md-button class="md-raised md-mini md-accent">Clear</md-button> -->
      </md-table-toolbar>

      <md-table-row
        slot="md-table-row"
        slot-scope="{ item }"
        :class="getClass(item)"
        md-selectable="single"
        v-on:dblclick="onEdit(item)"
      >
        <md-table-cell md-label="TL" v-if="!item.isEdit">{{ item.tl }}</md-table-cell>
        <md-table-cell v-if="item.isEdit">
          <md-field >
            <label>TL</label>
            <md-input v-model="item.tl"></md-input>
          </md-field>
        </md-table-cell>

        <md-table-cell md-label="NAME" v-if="!item.isEdit">{{ item.name }}</md-table-cell>
        <md-table-cell v-if="item.isEdit">
          <md-field >
            <label>NAME</label>
            <md-input v-model="item.name"></md-input>
          </md-field>
        </md-table-cell>

        <md-table-cell md-label="AREA" v-if="!item.isEdit">{{ item.area }}</md-table-cell>
        <md-table-cell v-if="item.isEdit">
          <md-field >
            <label>AREA</label>
            <md-input v-model="item.area"></md-input>
          </md-field>
        </md-table-cell>

        <md-table-cell md-label="ACTIVITY" v-if="!item.isEdit">{{ item.activity }}</md-table-cell>
        <md-table-cell v-if="item.isEdit">
          <md-field >
            <label>ACTIVITY</label>
            <md-input v-model="item.activity"></md-input>
          </md-field>
        </md-table-cell>

        <md-table-cell md-label="CA NO." v-if="!item.isEdit">{{ item.cano }}</md-table-cell>
        <md-table-cell v-if="item.isEdit">
          <md-field >
            <label>CA NO.</label>
            <md-input v-model="item.cano"></md-input>
          </md-field>
        </md-table-cell>

        <md-table-cell md-label="TOTAL NO. OF DAYS" v-if="!item.isEdit">{{ item.totalNoOfDays }}</md-table-cell>
        <md-table-cell v-if="item.isEdit">
          <md-field >
            <label>TOTAL NO. OF DAYS</label>
            <md-input v-model="item.totalNoOfDays" type="number" v-on:change="computeAmount(item)"></md-input>
          </md-field>
        </md-table-cell>

        <md-table-cell md-label="RATE" v-if="!item.isEdit">{{ item.rate }}</md-table-cell>
        <md-table-cell v-if="item.isEdit">
          <md-field >
            <label>RATE</label>
            <md-input v-model="item.rate" type="number" v-on:change="computeAmount(item)"></md-input>
          </md-field>
        </md-table-cell>

        <md-table-cell md-label="Amount(Basic)" v-if="!item.isEdit">{{ item.basicAmt }}</md-table-cell>
        <md-table-cell v-if="item.isEdit">
          
          <md-field>
            <label>Amount(Basic)</label>
            <span class="md-prefix">Php</span>
            <md-input type="number" disabled v-model="item.basicAmt"></md-input>
          </md-field>

          
        </md-table-cell>
<!-- 
        <md-table-cell
          md-label="For Reimbursement(Basic)"
          v-if="!item.isEdit"
        >{{ item.reimbursement }}</md-table-cell>
        <md-table-cell v-if="item.isEdit">
          <md-field >
            <label>For Reimbursement(Basic)</label>
            <span class="md-prefix">Php</span>
            <md-input v-model="item.reimbursement" type="number"></md-input>
          </md-field>
        </md-table-cell> 
-->

        <md-table-cell md-label="REMARKS" v-if="!item.isEdit">{{ item.remarks }}</md-table-cell>
        <md-table-cell v-if="item.isEdit">
          <md-field >
            <label>REMARKS</label>
            <md-input v-model="item.remarks"></md-input>
          </md-field>
        </md-table-cell>

        <md-table-cell md-label>
          <!-- 
             <md-button class="md-fab md-mini md-primary" v-if="!item.isEdit" @click="onEdit(item)"> 
              <md-icon>edit</md-icon>
           </md-button>

          <md-button class="md-fab  md-mini md-plain" v-if="item.isEdit"  @click="onSave(item)">
              <md-icon>save</md-icon>
          </md-button>
          -->
          <!-- 
          </md-table-cell>  

        <md-table-cell md-label="" >   
          -->
<!-- 
          <a href="#" v-if="!item.isEdit" @click="onEdit(item)">
            <md-icon>edit</md-icon>
          </a>
          &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp; 
           -->
          <a
            href="#"
            v-if="item.isEdit"
            @click="onSave(item)"
          >
            <md-icon>save</md-icon>
          </a>
<!--           
          &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
          <a
            href="#"
            v-if="item.isEdit"
            @click="onCancel(item)"
          >
            <md-icon>cancel</md-icon>
          </a> 
-->

          &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
          <a
            href="#"
            v-if="!item.isEdit"
            @click="onDelete(item)"
          >
            <md-icon>delete</md-icon>
          </a>

          <!-- 
          <md-button class="md-fab md-mini md-plain" v-if="!item.isEdit" @click="onDelete(item)">
            <md-icon>delete</md-icon>
          </md-button>
          -->
        </md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
import ARReceiptGenerator from "./ARReceiptGenerator.ts";

export default {
  name: "DTRSummary",
  created: function () {
      if(localStorage.getItem("people")){
        this.people = JSON.parse(localStorage.getItem("people"));
      }
  },
  data: () => ({
    tempItem: {},
    selected: {},
    people: [],
  }),
  methods: {
    getClass: ({ id }) => ({
      "md-primary": id === 2,
      "md-accent": id === 3,
    }),
    computeAmount(item){
      item.basicAmt = item.rate * item.totalNoOfDays;
    },
    onEdit(item) {
      if(this.tempItem){
        this.tempItem.isEdit = false;
      }
      this.tempItem = item;
      item.basicAmt = item.rate * item.totalNoOfDays;
      item.isEdit = true;
    },
    onSave(item) {
      item.isEdit = false;
      localStorage.setItem("people",JSON.stringify(this.people));
    },
    onCancel(item){
      item = this.tempItem;
      item.isEdit = false;
    },
    onDelete(item) {
      const index = this.people.indexOf(item);
      if (index > -1) {
        this.people.splice(index, 1);
      }
      item.isEdit = false;
    },
    onAdd() {
      this.people.push({
        tl: " ",
        name: " ",
        area: " ",
        activity: " ",
        cano: " ",
        totalNoOfDays: 1,
        rate: 1,
        basicAmt: 0,
        reimbursement: 0,
        remarks: " ",
        isNew: true,
        isEdit: true,
      });
    },
    onSelect(item) {
      this.selected = item;
    },
    onPrint() {
      const arReceiptGenerator = new ARReceiptGenerator();
      arReceiptGenerator.generatePDF(this.people);
    },
  },
};
</script>
