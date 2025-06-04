<script lang="ts">
  _seqlog("public pages shared layout loaded");
  let { children } = $props();

</script>

<div class="page">
  <div class="container">
    {@render children()}

  </div>
</div>
