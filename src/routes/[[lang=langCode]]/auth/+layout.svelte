<script lang="ts">
	import { page } from '$app/stores';
	import { route } from '$lib/ROUTES';

	import loginPageImgSrc from '$lib/assets/LoginImage.png?enhanced';
	import registerPageImgSrc from '$lib/assets/RegisterImage.png?enhanced';

	const images = {
		[route('/auth/login')]: {
			src: loginPageImgSrc,
			alt: 'A login page image'
		},

		[route('/auth/register')]: {
			src: registerPageImgSrc,
			alt: 'A register page image'
		}
	};

	$: currentPageImage = images[$page.url.pathname];
</script>

<div class="md:grid md:grid-cols-[1fr,1.6fr] md:gap-8">
		<enhanced:img
			src={currentPageImage?.src}
			alt={currentPageImage?.alt}
			class="hidden object-cover grayscale rounded shadow-md blur hover:blur-none hover:grayscale-0 md:block mt-4 ml-4"
		/>
	<section class="md:max-w-xl">
		<slot />
	</section>
</div>
