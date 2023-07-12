import type { Meta, StoryObj } from "@storybook/react";
import RemainingCount from "./RemainCount";

const meta: Meta<typeof RemainingCount> = {
  title: "test/RemainingCount",
  component: RemainingCount,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof RemainingCount>;

export const Primary: Story = {
  args: { 
    userEmail:"tmsprqo@gmail.com"
  }
};
