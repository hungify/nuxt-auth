<script setup lang="ts">
import { string, object, email, minLength, Input, is } from "valibot";
import type { FormSubmitEvent } from "@nuxt/ui/dist/runtime/types";

useHead({
	title: "Nuxt Authentication",
	meta: [
		{
			name: "description",
			content: "Nuxt Authentication with HTTP-Onlly Cookies",
		},
	],
});

const schema = object({
	email: string([email("Invalid email")]),
	password: string([minLength(4, "Must be at least 8 characters")]),
});

type Schema = Input<typeof schema>;

const state = shallowReactive({
	email: "admin@admin.com",
	password: "admin",
});

const isAuthenticated = ref(false);

const { $toast } = useNuxtApp();

// onMounted(async () => {
// 	try {
// 		const token = await $fetch(`/api/me`, {
// 			method: "get",
// 		});
// 		const cookie = useCookie("token");
// 		cookie.value = token.body.token;
// 		isAuthenticated.value = true;
// 	} catch (error) {
// 		console.log("### :: file: index.vue:28 :: error:", error);
// 	}
// });

async function submit(event: FormSubmitEvent<Schema>) {
	$toast.promise(
		$fetch("api/proxy/login", {
			method: "POST",
			body: JSON.stringify(event.data),
			headers: {
				"Content-Type": "application/json",
			},
		}),
		{
			loading: "Loading",
			success: (data) => {
				console.log("### :: file: index.vue:56 :: data:", data);
				isAuthenticated.value = true;
				return "Logged in successfully";
			},
			error: (error) => {
				console.log("### :: file: index.vue:40 :: error:", error);
				return error.message;
			},
		},
	);
}
</script>

<template>
	<UContainer style="width: 400px">
		<UCard>
			<UContainer v-if="isAuthenticated">
				<UAlert :title="`Welcome to ${state.email}`" />
				<UButton class="mt-4">Logout</UButton>
			</UContainer>
			<UForm v-else :schema="schema" :state="state" @submit.prevent="submit">
				<UFormGroup label="Email" name="email">
					<UInput v-model="state.email" />
				</UFormGroup>
				<UFormGroup label="Password" name="password" class="mt-4">
					<UInput v-model="state.password" type="password" />
				</UFormGroup>
				<UButton type="submit" class="mt-4">Submit</UButton>
			</UForm>
		</UCard>
	</UContainer>
</template>
