import { QuestionInput } from "./QuestionInput";

export function FollowupNode({ node }) {
  return <QuestionInput node={node} label={`${node.name} Options`} />;
}
