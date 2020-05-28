<template>
  <component
    :is="selectedForm"
    :poll="poll"
    :draftPoll="draftPoll"
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
    poll: {
      type: Object,
      default: () => ({
        title: "",
        options: []
      })
    },
    draftPoll: {
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
