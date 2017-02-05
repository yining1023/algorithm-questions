// 236. Lowest Common Ancestor of a Binary Tree

// Given a binary tree, find the lowest common ancestor (LCA) of two given nodes in the tree.

// According to the definition of LCA on Wikipedia: “The lowest common ancestor is defined between two nodes v and w as the lowest node in T that has both v and w as descendants (where we allow a node to be a descendant of itself).”

//         _______3______
//        /              \
//     ___5__          ___1__
//    /      \        /      \
//    6      _2       0       8
//          /  \
//          7   4
// For example, the lowest common ancestor (LCA) of nodes 5 and 1 is 3. Another example is LCA of nodes 5 and 4 is 5, since a node can be a descendant of itself according to the LCA definition.

// Hide Company Tags Amazon LinkedIn Apple Facebook Microsoft
// Hide Tags Tree
// Hide Similar Problems (E) Lowest Common Ancestor of a Binary Search Tree

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
 
// divide and conquer 
// 无脑的丢左边,
// if there is lac, return lac, if no lcs, there is A/B, return A/B
// if root === null, === A/B, return A/B
// 4 cases:
// left   right    result
// null   null     null
// sth    null     sth
// null   sth      sth
// sth    sth      root
var lowestCommonAncestor = function(root, p, q) {
  if (root === null || root === p || root === q) {
      return root;
  }

  // don not forget to pass in p and q too
  var leftLCA = lowestCommonAncestor(root.left, p, q);
  var rightLCA = lowestCommonAncestor(root.right, p, q);
  
  if (leftLCA !== null && rightLCA !== null) {
      return root;
  }
  
  if (leftLCA === null && rightLCA !== null) {
      return rightLCA;
  }
  
  if (leftLCA !== null && rightLCA === null) {
      return leftLCA;
  }

  return null;
};
