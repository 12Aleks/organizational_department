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
        this.gradient_first.addColorStop(0, 'rgba(77,77,77,1)');
        this.gradient_first.addColorStop(1, 'rgba(129,129,129,1)');

        this.gradient_second = this.$refs.canvas.getContext('2d').createLinearGradient(0, 0, 0, 400);
        this.gradient_second.addColorStop(0, 'rgba(110,126,133,1)');
        this.gradient_second.addColorStop(1, 'rgba(136,164,178,1)');

        this.gradient_third = this.$refs.canvas.getContext('2d').createLinearGradient(0, 0, 0, 400);
        this.gradient_third.addColorStop(0, '#4C3E44');
        this.gradient_third.addColorStop(1, '#654D57');

        this.gradient_fourth = this.$refs.canvas.getContext('2d').createLinearGradient(0, 0, 0, 400);
        this.gradient_fourth.addColorStop(0, '#354139');
        this.gradient_fourth.addColorStop(1, '#415649');

        this.gradient_fifth = this.$refs.canvas.getContext('2d').createLinearGradient(0, 0, 0, 400);
        this.gradient_fifth.addColorStop(0, '#653636');
        this.gradient_fifth.addColorStop(1, '#873333');
    }
}
