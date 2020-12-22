export interface TreeNode {
  readonly value: string | number;
  readonly title: string;
  readonly children: TreeNode[];
}

export const filterTree = <T>(
  data: T[],
  childrenKey: keyof T,
  valueKey: keyof T,
  value: unknown
) => {
  const getNodes = (result: T[], object: T) => {
    if (object[valueKey] === value) {
      result.push({
        ...object,
        // Remove children of last node
        [childrenKey]: []
      });

      return result;
    }

    const childNodes = object[childrenKey];

    if (Array.isArray(childNodes)) {
      const nodes = childNodes.reduce(getNodes, []);
      if (nodes.length) {
        result.push({ ...object, [childrenKey]: nodes });
      }
    }

    return result;
  };

  return data.reduce(getNodes, []);
};

export const searchTree = <T>(tree: T | T[], childrenKey: string, valueKey: keyof T, value: unknown): T | null => {
  let i;
  let f: T | null = null;

  if (Array.isArray(tree)) {
    for (i = 0; i < tree.length; i++) {
      f = searchTree(tree[i], childrenKey, valueKey, value);
      if (f) {
        return f;
      }
    }
  } else if (typeof tree === 'object') {
    if (tree[valueKey] !== undefined && tree[valueKey] === value) {
      return tree;
    }
  }
  if (tree[childrenKey] !== undefined && tree[childrenKey].length > 0) {
    return searchTree(tree[childrenKey], childrenKey, valueKey, value);
  } else {
    return null;
  }
};

export const flattenTree = <T>(tree: T | T[], childrenKey: string): T[] => {
  let result: T[] = [];

  for (const node of tree) {
    result.push(node);

    if (!node[childrenKey]) {
      continue;
    }

    result = result.concat(
      flattenTree(node[childrenKey], childrenKey)
    );
  }
  
  return result;
};

export const filterTreeNode = (searchTerm, option) => String(option?.title).toLowerCase().includes(searchTerm?.toLowerCase());