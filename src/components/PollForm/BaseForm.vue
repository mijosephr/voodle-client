<template>
  <component
    :is="selectedForm"
    :form="form"
    @change-selected-form="changeSelectedForm"
  />
</template>

<script>
import PollForm from "@/components/PollForm/PollForm";
import OptionsForm from "@/components/PollForm/OptionsForm";
import SettingsForm from "@/components/PollForm/SettingsForm";

export default {
  components: { PollForm, OptionsForm, SettingsForm },
  props: {
    form: {
      type: Object,
      default: () => ({
        title: "",
        options: []
      })
    }
  },
  data() {
    return {
      selectedForm: "PollForm"
    };
  },
  methods: {
    changeSelectedForm(formName) {
      this.selectedForm = formName;
    }
  }
};
</script>
