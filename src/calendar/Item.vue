<script type="text/babel">
  export default {
    name: "item",
    props: {
      source: Object
    },
    render(h) {

      var parent, {renderContent, _renderProxy} = this.$parent;

      return renderContent.call(_renderProxy, h, this.source);

    }
  }
</script>

