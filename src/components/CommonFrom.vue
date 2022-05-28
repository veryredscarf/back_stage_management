<template>
  <el-form ref="form" label-width="100px" :model="form" :inline="inline">
    <el-form-item v-for="item in formLabel" :key="item.label" :label='item.label'>
      <el-input
        v-if="item.type==='input'" 
        :placeholder="'请输入'+item.label"
        v-model="locationForm[item.model]"
        @input="$emit('myevent',locationForm[item.model])" 
      ></el-input>

      <el-switch v-if="item.type==='switch'" v-model="locationForm[item.model]"></el-switch>

      <el-date-picker v-if="item.type==='date'" type="date"
        value-format="yyyy-MM-dd"
        placeholder="选择日期"
        v-model="locationForm[item.model]"
      ></el-date-picker>

      <el-select
        v-if="item.type==='select'"
        placeholder="请选择"
        v-model="locationForm[item.model]"
      >
        <el-option v-for="item in item.opts" 
        :key="item.value"
        :label="item.label"
        :value="item.value"
        >
        </el-option>
      </el-select>
    </el-form-item>


    <el-form-item>
      <slot></slot>
    </el-form-item>
  </el-form>

</template>

<script>
export default {
  name:'CommonForm',
  props:{
    // 定义传入form表单数据的类型
    formLabel:Array,
    form:Object,
    inline:Boolean  //  输入框是单行还是多行

  },
  watch: {
    form: {
      handler(val) {
        this.locationForm = val
        console.log(val);
      },
      // immediate: true,
      // deep: true,
    },
  },

created(){
  console.log(this.locationForm);
  console.log(this.formLabel);
  console.log(this.locationForm.addr)
},
  data(){
    return{
      locationForm:this.form
    }
  },

  methods:{
    inputEvent(val){
      console.log(val);
    }
  }

}
</script>