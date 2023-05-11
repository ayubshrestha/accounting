<template>
    <div class="row">
        <div class="col-12">
            <header>
            <div class="row">
                <div class="col-2" style="display: flex; position: relative;top: 12px; left: 30px;">
                    <img src="../assets/home.png" alt="home">
                    <p style="position: relative; top: 13px; font-weight: 700; font-size: 24px; left: 5px; color: #85FFA7;">Start</p>
                </div>
                <div class="col-8">
                    <input class="master_search" type="text" placeholder="&#xF002; Search">
                </div>
            </div>
            </header>
        </div>
    </div>
</template>
<script>
// require("../assets/reset.css");
export default {
    name: 'inventory'
}
</script>

<style>
header {
    height: 80px;
    width: 98%;
    margin: 10px auto;
    background-color: #013A71;
    border-radius: 10px;
}
.master_search {
    background-color: #2F6599;
    border: none;
    position: relative;
    top: 18px;
    color: #CACACA;
    border-radius: 5px;
    height: 45px;
    width: 420px;
    padding: 5px 15px;
    left: 400px;
}
::placeholder {
    color: #CACACA;
}
</style>
