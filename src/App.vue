<template>
  <div id="app">
    <a-button>按钮</a-button>
    <div id="nav">
      <router-link to="/dashboard/analysis">dashboard</router-link> |
      <router-link to="/form">form</router-link>
    </div>
    <router-view />
  </div>
</template>

<style lang="less"></style>
