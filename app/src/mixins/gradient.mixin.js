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
        this.gradient_first.addColorStop(0, 'rgba(195,29,29,0.8)');
        this.gradient_first.addColorStop(1, 'rgba(183,28,28,.9)');

        this.gradient_second = this.$refs.canvas.getContext('2d').createLinearGradient(0, 0, 0, 400);
        this.gradient_second.addColorStop(0, 'rgba(29,103,34,0.8)');
        this.gradient_second.addColorStop(1, 'rgba(27,94,32,.9)');

        this.gradient_third = this.$refs.canvas.getContext('2d').createLinearGradient(0, 0, 0, 400);
        this.gradient_third.addColorStop(0, 'rgba(250,129,23,0.8)');
        this.gradient_third.addColorStop(1, 'rgba(245,127,23,.9)');

        this.gradient_fourth = this.$refs.canvas.getContext('2d').createLinearGradient(0, 0, 0, 400);
        this.gradient_fourth.addColorStop(0, 'rgba(1,93,165,.8)');
        this.gradient_fourth.addColorStop(1, 'rgba(13,71,161,.9)');

        this.gradient_fifth = this.$refs.canvas.getContext('2d').createLinearGradient(0, 0, 0, 400);
        this.gradient_fifth.addColorStop(0, 'rgba(92,120,133,0.8)');
        this.gradient_fifth.addColorStop(1, 'rgba(84,110,122,.9)');
    }
}
