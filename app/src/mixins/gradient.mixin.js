export default {
    data(){
        return {
            gradient_first: null,
            gradient_second: null,
            gradient_third: null,
            gradient_fourth: null,
            gradient_fifth: null,
        }
    },
    mounted(){
        this.gradient_first = this.$refs.canvas.getContext('2d').createLinearGradient(0, 0, 0, 400);
        this.gradient_first.addColorStop(0, 'rgba(69,90,100,.7)');
        this.gradient_first.addColorStop(1, 'rgba(69,90,100,1)');

        this.gradient_second = this.$refs.canvas.getContext('2d').createLinearGradient(0, 0, 0, 400);
        this.gradient_second.addColorStop(0, 'rgba(136,164,178, .7)');
        this.gradient_second.addColorStop(1, 'rgba(136,164,178,1)');

        this.gradient_third = this.$refs.canvas.getContext('2d').createLinearGradient(0, 0, 0, 400);
        this.gradient_third.addColorStop(0, 'rgba(86,86,71,.7)');
        this.gradient_third.addColorStop(1, 'rgba(86,86,71,1)');

        this.gradient_fourth = this.$refs.canvas.getContext('2d').createLinearGradient(0, 0, 0, 400);
        this.gradient_fourth.addColorStop(0, 'rgba(109,118,81,.7)');
        this.gradient_fourth.addColorStop(1, 'rgba(109,118,81,1)');

        this.gradient_fifth = this.$refs.canvas.getContext('2d').createLinearGradient(0, 0, 0, 400);
        this.gradient_fifth.addColorStop(0, 'rgba(158,134,107,.7)');
        this.gradient_fifth.addColorStop(1, 'rgba(158,134,107,1)');
    }
}
