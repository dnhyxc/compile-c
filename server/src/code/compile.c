#include <stdio.h>

void test1(int arr[]) {
	// arr 是指针，所以长度是 4
	printf("%d\n", sizeof(arr)); // 4
}

void test2(char ch[]) {
	// ch 也是指针，所以长度是 4
	printf("%d\n", sizeof(ch)); // 4
}

int main() {
	int arr[10] = { 0 };
	char ch[10] = { 0 };   // 将整型变量 a 转换为浮点型变量 b
	// 计算整个数组所占内存空间的大小，所以是 40
	printf("%d\n", sizeof(arr)); // 40
	// ch 是字符类型，长度是 10
	printf("%d\n", sizeof(ch)); // 10

printf("dnhyxc\n"); // dnhyxc

	// test1(arr);
	// test2(ch);

	return 0;
}