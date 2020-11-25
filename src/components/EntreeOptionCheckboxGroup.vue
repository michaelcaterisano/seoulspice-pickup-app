<template>
    <b-field :addons="false" :label="labelText">
        <div class="checkbox-container">
            <b-checkbox-button
                v-for="choice in group.choices"
                :key="choice.name"
                v-model="choice.selected"
                :disabled="checkboxIsDisabled(choice)"
                type="is-text"
            >
                <div class="image-container">
                    <img :src="getImageUrl(choice)" />
                    <div v-bind:class="{ overlay: choice.selected }"></div>
                </div>
                {{ getChoiceName(choice) }}
            </b-checkbox-button>
        </div>
    </b-field>
</template>

<script>
export default {
    computed: {
        labelText() {
            let max =
                this.category.name === "Korean Feast For 2" ||
                this.category.name === "Korean Feast For 4"
                    ? this.group.KFmax
                        ? this.group.KFmax
                        : this.group.max
                    : this.group.max;
            return this.group.label + " (Choose up to  " + max + ")";
        },
        countSelectedOptions() {
            return this.group.choices.filter((choice) => choice.selected)
                .length;
        },
    },
    methods: {
        checkboxIsDisabled(item) {
            let max =
                this.category.name === "Korean Feast For 2" ||
                this.category.name === "Korean Feast For 4"
                    ? this.group.KFmax
                    : this.group.max;
            return this.countSelectedOptions >= max && !item.selected;
        },
        getChoiceName(choice) {
            let choiceName = choice.name;
            if (choice.price > 0) {
                choiceName += " (+" + choice.price + ")";
            }
            return choiceName;
        },
        updateOption() {
            return 1;
        },
        getImageUrl(choice) {
            return choice.imageUrl;
        },
    },
    name: "OrderOptionCheckboxGroup",
    props: {
        group: {
            type: Object,
            required: true,
        },
        category: {
            type: Object,
            required: true,
        },
    },
};
</script>

<style scoped>
img {
    display: block;
    max-width: 100%;
    width: auto;
    height: auto;
    border: 3px solid black;
    border-radius: 15px;
}
.image-container {
    position: relative;
    display: inline-block;
    width: 150px;
    border-radius: 15px;
}
.overlay {
    background: rgba(0, 0, 0, 0.5);
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    border-radius: 15px;
    background-image: url("~@/assets/check.png");
    background-size: 80%;
    background-repeat: no-repeat;
    background-position: center;
}
.checkbox-container {
    display: flex;
    flex-direction: row;
    justify-content: left;
    flex-wrap: wrap;
}
</style>
