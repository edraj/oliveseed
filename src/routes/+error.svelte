<script lang="ts">
  import { translate } from '$src/utils/resources';
  import { routeLink } from '$src/utils/route';
</script>

<main class="center-content c-6">
  <div class="box">
    <p>{translate('Something went wrong', 'SOMETHING_WENT_WRONG')}</p>
    <div class="txt-c">
      <a href={routeLink('/')}>{translate('Back to homepage', 'BACK_TO_HOMEPAGE')}</a>
    </div>
  </div>
</main>
