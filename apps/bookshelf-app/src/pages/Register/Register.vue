<template>
  <v-container fill-height fluid style="background-color: var(--background-poop)">
    <v-row justify="center">
      <v-col class="pt-0 text-center" cols="12" sm="6" md="5" lg="4" xl="3">
        <p class="title">Register  your account</p>
        <p class="subtitle">Please make sure all fields are filled in correctly.</p>
        <v-divider class="pb-5 mt-3"></v-divider>
        <BaseForm @submit="handleSignUp">
          <BaseTextField v-model="firstName" label="First Name" :rules='firstNameRules'/>
          <BaseTextField v-model="lastName" label="Last Name" :rules='lastNameRules' />
          <BaseTextField v-model="email" label="E-mail" :rules='emailRules' />
          <BaseTextField type="password" v-model="password" label="Password" :rules='passwordRules' />
          <BaseTextField type="password" v-model="confirmPassword" label="Confirm Password" :rules="confirmPasswordRules" />
          <BaseBtn :loading="submitLoading" width="100%" color="primary" type="submit" text="Submit"/>
        </BaseForm>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { RegisterApiPayload } from '../../api/auth';
import {
  ruleAtLeastOneNumber,
  ruleAtLeastOneUppercase,
  ruleEmailRequiredAndValid,
  ruleFieldRequiredMinMax, ruleSameAsField
} from '../../validation-rules/text-validations';
import BaseForm from '../../components/Base/BaseForm.vue';
import BaseTextField from '../../components/Base/BaseTextField.vue';
import BaseBtn from '../../components/Base/BaseBtn.vue';
@Component({
  components: { BaseBtn, BaseTextField, BaseForm }
})
export default class Login extends Vue {
  private firstName = '';
  private lastName = '';
  private email = '';
  private password = '';
  private confirmPassword = '';
  private submitLoading = false;

  private firstNameRules = ruleFieldRequiredMinMax('First Name', 3, 50);
  private lastNameRules = ruleFieldRequiredMinMax('Last Name', 3, 50);
  private emailRules = ruleEmailRequiredAndValid();
  private passwordRules = [...ruleFieldRequiredMinMax('Password', 6, 50), ...ruleAtLeastOneUppercase('Password'), ...ruleAtLeastOneNumber('password')];

  get confirmPasswordRules(): Array<unknown> {
    return ruleSameAsField('Confirm Password', 'Password', this.password);
  }

  handleSignUp(): void {
    const payload: RegisterApiPayload = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      password: this.password,
      confirmPassword: this.confirmPassword,
    };

    this.submitLoading = true;
    this.$store.dispatch('auth/register', payload).then(() => {
        this.submitLoading = false;
        this.$router.push({ name: 'Books ' });
      }).catch(() => {
        this.submitLoading = false;
      });
  }
}
</script>

<style lang="scss" scoped>
.title {
  font-size: 17px;
  margin-bottom: 6px;
  color: #000000;
  font-weight: bold;
}
.subtitle {
  margin-bottom: 0;
  font-size: 14px;
  color: #000000;
}
</style>
