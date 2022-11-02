<template>
  <div class="amstramgram-post">
    <div class="amstramgram-bar amstramgram-header">
      <div class="amstramgram-icon">
        <div class="circle-picture">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3UO3MyHiEr1m7WxPDjONOPxXxp5WELC6am9-S1AD3bw&s" alt="Julien Carquois">
        </div>
      </div>
      <div class="amstramgram-username">
        <strong>julien.carquois</strong>
      </div>
      <div />
    </div>
    <div class="amstramgram-picture">
      <img src="data:image/jpeg;base64,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" />
    </div>

    <div class="amstramgram-bar amstramgram-footer">
      <div class="amstramgram-icon">❤</div>
      <div class="amstramgram-icon">💬</div>
    </div>
    <div class="amstramgram-like-bar"><span>1000 likes</span></div>
    <div class="amstramgram-description"><span>UwU mon amour Ace</span></div>
  </div>
</template>

<style lang="scss">
  .amstramgram-post {
    display: flex;
    flex-direction: column;
    width: 100%;
    background-color: white;
  }
  .amstramgram-bar {
    display: grid;
    height: 60px;
    align-items: center;
    div {
      display: flex;
    }
  }
  .amstramgram-header {
      grid-template-columns: 80px 120px auto;
  }
  .amstramgram-footer {
    grid-template-columns: 80px 80px auto;
  }
  .circle-picture {
    width: 50px;
    border-radius: 200px;
    overflow: hidden;
    img {
      width: 100%;
    }
  }
  .amstramgram-icon {
    justify-content: flex-start;
    padding-left: 20px;
    font-size: 50px;
  }
  .amstramgram-picture {
    overflow: hidden;
    img {
      width: 100%;
    }
  }
  .amstramgram-like-bar {
    font-size: 12px;
    font-weight: 600;
    padding: 0 20px;
  }
  .amstramgram-description {
    font-size: 12px;
    padding: 10px 20px;
  }
</style>
