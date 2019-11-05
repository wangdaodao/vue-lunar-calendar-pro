<script type="text/babel">
  export default {
    name: "TitleBar",
    props: {
      year: [Number,String],
      month: [Number,String]
    },
    render(h) {

      var parent, {renderTitle, _renderProxy} = this.$parent;

      return renderTitle.call(_renderProxy, h, this.year,this.month);

    }
  }
</script>

