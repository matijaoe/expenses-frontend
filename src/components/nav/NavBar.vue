<script setup lang="ts">
import { useAuth } from 'composables/api/auth'
import { useUserStore } from 'store/user'
import { useIconStore } from 'store/icons'
const userStore = useUserStore()
const { iconWeight } = storeToRefs(useIconStore())

const { logout } = useAuth()
const iconSize = ref(20)
</script>

<template>
  <nav class="flex gap-8 justify-between items-center mb-4">
    <div class="flex items-center gap-6">
      <NavItem label="Home" to="/">
        <PhHouse :weight="iconWeight" :size="iconSize" />
      </NavItem>
      <NavItem label="Expenses" to="/expenses">
        <PhReceipt :weight="iconWeight" :size="iconSize" />
      </NavItem>
      <NavItem label="New expense" to="/expenses/new" type="primary">
        <PhPlusCircle :weight="iconWeight" :size="iconSize" />
      </NavItem>
    </div>
    <div class="flex items-center gap-6">
      <template v-if="!userStore.isAuthenticated">
        <NavItem label="Login" to="/login">
          <PhSignIn :weight="iconWeight" :size="iconSize" />
        </NavItem>
        <NavItem label="Register" to="/register">
          <PhIdentificationBadge :weight="iconWeight" :size="iconSize" />
        </NavItem>
      </template>

      <NavItem v-if="userStore.isAdmin" label="Admin" to="/admin">
        <PhHouse :weight="iconWeight" :size="iconSize" />
      </NavItem>
      <NavItem v-if="userStore.isAuthenticated" label="Logout" @click="logout">
        <PhSignOut :weight="iconWeight" :size="iconSize" />
      </NavItem>
    </div>
  </nav>
</template>

<style lang="scss" scoped></style>
