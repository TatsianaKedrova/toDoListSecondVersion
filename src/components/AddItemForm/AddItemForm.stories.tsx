import React from 'react';
 //@ts-ignore
 import { Story, Meta } from '@storybook/react';
 import {AddItemForm, AddItemPropsType} from "./AddItemForm";
 //@ts-ignore
 import {action} from "@storybook/addon-actions";


 export default {
     title: 'Todolist/AddItemForm',
     component: AddItemForm,
     argTpes: {
         onClick: {
             description: "AddITtemForm clicked"
         }
     },
 } as Meta;

 const Template: Story<AddItemPropsType> = (args: AddItemPropsType) => <AddItemForm {...args} />

 export const AddItemFormExample = Template.bind({})
 AddItemFormExample.args = {
     addItem: action('Button inside clicked')
 }
