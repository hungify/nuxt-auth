<script lang="ts" setup>
import { Toaster } from "vue-sonner";
</script>

<template>
	<NuxtLayout>
		<ClientOnly>
			<Toaster richColors />
		</ClientOnly>
		<NuxtLoadingIndicator />
		<NuxtPage />
	</NuxtLayout>
</template>
