<template>
	<p>Signing off...</p>
</template>

<script>
export default {
	mounted () {
		const unsetToken = require('~/utils/auth').unsetToken
		const logout = require('~/utils/lock').logout

		this.$store.commit('SET_AUTH_TOKEN', null)
		this.$store.commit('SET_USER', null)
		unsetToken()
		logout()
	}
}
</script>
	