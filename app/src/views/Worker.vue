<template>
  <div class="app-page">
    <div>
      <div class="page-title">
        <h3 class="flow-text">Karta pracownika</h3>
      </div>
      <div class="row img_attachment">
        <Loader v-if="loader"/>
        <div v-show="!loader" class="col s12 m12">
          <div class="profile-header">
            <div class="profile-img">
              <img src="../assets/images/profile.jpg" width="200" alt="Profile Image">
            </div>
            <div class="profile-nav-info">
              <h3 class="user-name">{{worker.name}}</h3>
              <div class="address">
                <p class="worker_process">{{worker.process}}, {{worker.department}}</p>
              </div>
            </div>
          </div>

       {{worker}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Worker",
  data() {
    return {
      loader: true,
      departmentName: null,
      selectProcess: null,
      workerName: null,
      departmentInfo: [],
      selectedElement: []
    }
  },
  async mounted() {
    this.departmentName = this.$route.params.id.toUpperCase();
    this.selectProcess = this.$route.params.process.toUpperCase();
    this.workerName = this.$route.params.name.toUpperCase();
    this.departmentInfo = this.selectedElement = await this.$store.dispatch('selectedProcessAndDepartment', {departmentName: this.departmentName, selectProcessName: this.selectProcess })
    this.loader = false
  },
  computed: {
    worker() {
      return this.departmentInfo.filter((item, i, arr) => arr[i].name === this.workerName )[0]
    }
  }
}
</script>

<style scoped lang="scss">
$turquoise: #26a69a;
 .profile-header {
   background: $turquoise;
   width: 100%;
   display: flex;
   height: 170px;
   position: relative;
   box-shadow: 0 3px 4px rgba(0, 0, 0, 0.2);
   .profile-img {
     float: left;
     width: 273px;
     height: 200px;
     img {
       border-radius: 50%;
       height: 175px;
       width: 175px;
       border: 5px solid #fff;
       box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
       position: absolute;
       left: 50px;
       top: 15px;
       z-index: 5;
       background: #fff;
     }
   }
 }


 h3.user-name{
   margin: 0;
   color: #fff;
 }
 .profile-nav-info {
   float: left;
   display: flex;
   flex-direction: column;
   justify-content: center;
   padding-top: 60px;
 }

 .profile-nav-info h3 {
   font-variant: small-caps;
   font-size: 2rem;
   font-family: sans-serif;
   font-weight: bold;
 }

 .profile-nav-info .address {
   //display: flex;
   font-weight: bold;
   color: #f9f6f6;
   font-style: italic;
 }

 .profile-nav-info .address p {
   margin-right: 5px;
 }

 //@media (max-width: 1100px) {
 //  .profile-side {
 //    width: 250px;
 //    padding: 90px 15px 20px;
 //  }
 //
 //  .profile-img img {
 //    height: 200px;
 //    width: 200px;
 //    left: 50px;
 //    top: 50px;
 //  }
 //}
 //
 //@media (max-width: 900px) {
 //  .profile-header {
 //    display: flex;
 //    height: 100%;
 //    flex-direction: column;
 //    text-align: center;
 //    padding-bottom: 20px;
 //  }
 //
 //  .profile-img {
 //    float: left;
 //    width: 100%;
 //    height: 200px;
 //  }
 //
 //  .profile-img img {
 //    position: relative;
 //    height: 200px;
 //    width: 200px;
 //    left: 0;
 //  }
 //
 //  .profile-nav-info {
 //    text-align: center;
 //  }
 //
 //  .profile-option {
 //    right: 20px;
 //    top: 75%;
 //    transform: translateY(50%);
 //  }
 //
 //
 //  .profile-side {
 //    width: 100%;
 //    text-align: center;
 //    padding: 20px;
 //    margin: 5px 0;
 //  }
 //
 //  .profile-nav-info .address {
 //    justify-content: center;
 //  }
 //
 //  .user-rating {
 //    justify-content: center;
 //  }
 //}
 //
 //@media (max-width: 400px) {
 //  .profile-header h3 {
 //  }
 //
 //  .profile-option {
 //    width: 30px;
 //    height: 30px;
 //    position: absolute;
 //    right: 15px;
 //    top: 83%;
 //  }
 //
 //  .profile-option .notification .alert-message {
 //    top: -3px;
 //    right: -4px;
 //    padding: 4px;
 //    height: 15px;
 //    width: 15px;
 //    font-size: 0.7rem;
 //  }
 //
 //  .profile-nav-info h3 {
 //    font-size: 1.9rem;
 //  }
 //
 //  .profile-nav-info .address p,
 //  .profile-nav-info .address span {
 //    font-size: 0.7rem;
 //  }
 //}




</style>
