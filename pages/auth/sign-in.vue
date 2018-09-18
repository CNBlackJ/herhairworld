<template>
	<div class="auth0-lock" id="auth0-lock"/>
</template>

<script>
export default {
	middleware: 'anonymous',
	layout: 'mainWithoutFooter',
	mounted () {
		const showLogin = require('~/utils/lock').showLogin
		showLogin('auth0-lock')
	}
}
</script>

<style>
	.auth0-lock {
		padding-top: 55px;
	}
</style>