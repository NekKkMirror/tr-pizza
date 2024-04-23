import React, { type FC, memo } from 'react'

import type { CategoryProps } from '@CMP-categories'

const categories: string[] = [
  'Все',
  'Мясные',
  'Вегетарианская',
  'Гриль',
  'Острые',
  'Закрытые',
]

export const Categories: FC<CategoryProps> = ({ value, onChangeCategory }) => {
  return (
    <div className='categories'>
      <ul>
        {categories.map((categoryName: string, i: number) => (
          <li
            key={i}
            className={value === i ? 'active' : ''}
            onClick={() => onChangeCategory(i)}
          >
            {categoryName}
          </li>
        ))}
      </ul>
    </div>
  )
}

export const CategoriesComponent: React.NamedExoticComponent<CategoryProps> =
  memo(Categories)
