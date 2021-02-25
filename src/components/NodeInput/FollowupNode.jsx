import { QuestionInput } from "./index";

export function FollowupNode({ node, type }) {
  return <QuestionInput node={node} label={`${node.name} Options`} type={type} />;
}
