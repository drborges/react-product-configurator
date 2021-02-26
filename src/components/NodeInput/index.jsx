import { GroupNode } from "./GroupNode";
import { FollowupNode } from "./FollowupNode";
import { QuestionInput } from "./QuestionInput";
import { InstallationDetailsNode } from "./InstallationDetailsNode";

const mapping = {
  question: QuestionInput,
  followup: FollowupNode,
  option: QuestionInput,
  node: GroupNode,
  group: GroupNode,
};

export default function NodeInput({ node = {} }) {
  // If Node has no children, we've hit a leaf of the tree, thus, nothing to render
  if (node.childrenIds.length === 0) return null;
  // Currently skipping Additional Details, eventually we'll have a special node to
  // handle this branch of the tree
  if (node.name === "Additional Details") {
    return <InstallationDetailsNode node={node} />
  }

  const Input = mapping[node.type];
  return <Input node={node} />;
}
