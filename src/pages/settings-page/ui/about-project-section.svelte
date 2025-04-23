<script>
	import { CONTACTS } from "@/shared/constants";
</script>

<section>
	Telegram: <a href={CONTACTS.tg.href} target="_blank">
		<span class="text-indigo-600 hover:font-semibold">
			{@html CONTACTS.tg.label}
		</span>
	</a>
</section>
